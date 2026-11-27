// Produkčný server webu: servíruje hotový build (dist/) a prijíma dopyty z formulára (POST /api/contact).
// Bez frameworku – len node:http. Konfigurácia cez premenné prostredia (pozri .env.example).
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'
import { buildInquiryMail, parseInquiry } from './contact.mjs'

const env = process.env
const isProd = env.NODE_ENV === 'production'
const PORT = Number(env.PORT) || 3000
const HOST = env.HOST || '127.0.0.1'
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = resolve(ROOT, 'dist')
const OUTBOX = resolve(ROOT, 'server/outbox')

// --- E-mail ---------------------------------------------------------------
// S SMTP_HOST posiela cez SMTP schránku. Bez neho (len pri vývoji) uloží e-mail do server/outbox/*.eml.
const smtpConfigured = Boolean(env.SMTP_HOST)
if (isProd && !smtpConfigured) console.warn('⚠ SMTP_HOST nie je nastavený – formulár nebude odosielať e-maily.')

const transport = smtpConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 465,
      secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : (Number(env.SMTP_PORT) || 465) === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' })

const MAIL_TO = env.MAIL_TO || 'adamlukacphoto@gmail.com'
const MAIL_FROM = env.MAIL_FROM || env.SMTP_USER || 'web@localhost'

async function sendInquiry(data) {
  const mail = buildInquiryMail(data)
  const info = await transport.sendMail({ from: { name: 'Web Adam Lukac Photo', address: MAIL_FROM }, to: MAIL_TO, ...mail })
  if (!smtpConfigured) {
    await mkdir(OUTBOX, { recursive: true })
    const file = join(OUTBOX, `${new Date().toISOString().replace(/[:.]/g, '-')}.eml`)
    await writeFile(file, info.message)
    console.log(`✉ (vývoj) e-mail uložený: ${file}\n  Predmet: ${mail.subject}`)
  }
}

// --- Ochrana pred zahltením: max. 5 dopytov za 10 minút z jednej IP ------------
const RATE_WINDOW = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > RATE_WINDOW) hits.delete(k)
  return recent.length > RATE_MAX
}
const clientIp = (req) =>
  (env.TRUST_PROXY === 'true' && req.headers['x-forwarded-for']?.split(',')[0].trim()) || req.socket.remoteAddress

// --- API ------------------------------------------------------------------
function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(body))
}

function readBody(req, limit = 32 * 1024) {
  return new Promise((ok, fail) => {
    let size = 0
    const chunks = []
    req.on('data', (c) => {
      size += c.length
      if (size > limit) {
        fail(Object.assign(new Error('too_large'), { status: 413 }))
        req.destroy()
      } else chunks.push(c)
    })
    req.on('end', () => ok(Buffer.concat(chunks).toString('utf8')))
    req.on('error', fail)
  })
}

async function handleContact(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method_not_allowed' })
  if (!/^application\/json\b/.test(req.headers['content-type'] || '')) return json(res, 415, { ok: false, error: 'json_only' })
  if (rateLimited(clientIp(req))) return json(res, 429, { ok: false, error: 'too_many_requests' })

  let body
  try {
    body = JSON.parse(await readBody(req))
  } catch (e) {
    return json(res, e.status || 400, { ok: false, error: e.status ? 'too_large' : 'invalid_json' })
  }

  const result = parseInquiry(body)
  if (result.spam) return json(res, 200, { ok: true }) // robotovi sa tvárime, že prešlo
  if (result.errors) return json(res, 400, { ok: false, error: 'validation', fields: result.errors })
  if (isProd && !smtpConfigured) return json(res, 503, { ok: false, error: 'mail_not_configured' })

  try {
    await sendInquiry(result.data)
    return json(res, 200, { ok: true })
  } catch (e) {
    console.error('Odoslanie e-mailu zlyhalo:', e)
    return json(res, 502, { ok: false, error: 'send_failed' })
  }
}

// --- Statické súbory + SPA fallback ----------------------------------------
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

async function fileAt(urlPath) {
  let decoded
  try {
    decoded = decodeURIComponent(urlPath)
  } catch {
    return null
  }
  const path = resolve(DIST, '.' + normalize(decoded))
  if (path !== DIST && !path.startsWith(DIST + sep)) return null // ochrana pred ../
  try {
    const s = await stat(path)
    if (s.isFile()) return { path, size: s.size }
    if (s.isDirectory()) return fileAt(join(urlPath, 'index.html'))
  } catch {}
  return null
}

async function handleStatic(req, res, pathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    return res.end()
  }
  let file = await fileAt(pathname)
  // Adresy aplikácie (/sk/ponuka …) nemajú súbor – vráti sa index.html a cestu vyrieši router.
  // Chýbajúce súbory s príponou (napr. fotka) dostanú skutočnú 404.
  if (!file && !extname(pathname)) file = await fileAt('/index.html')
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    return res.end('Nenájdené')
  }
  const immutable = pathname.startsWith('/assets/')
  res.writeHead(200, {
    'Content-Type': TYPES[extname(file.path).toLowerCase()] || 'application/octet-stream',
    'Content-Length': file.size,
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : file.path.endsWith('.html') ? 'no-cache' : 'public, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  })
  if (req.method === 'HEAD') return res.end()
  createReadStream(file.path).pipe(res)
}

// --- Server ---------------------------------------------------------------
const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')
  try {
    if (pathname === '/api/contact') return await handleContact(req, res)
    if (pathname.startsWith('/api/')) return json(res, 404, { ok: false, error: 'not_found' })
    return await handleStatic(req, res, pathname)
  } catch (e) {
    console.error(e)
    if (!res.headersSent) json(res, 500, { ok: false, error: 'server_error' })
    else res.end()
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Server beží na http://${HOST}:${PORT} (${isProd ? 'produkcia' : 'vývoj'}, e-mail: ${smtpConfigured ? 'SMTP ' + env.SMTP_HOST : 'server/outbox'})`)
})
