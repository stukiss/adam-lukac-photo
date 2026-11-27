// Spracovanie dopytu z formulára: kontrola polí a zostavenie e-mailu v jednotnom tvare.

const LIMITS = { name: 100, email: 200, phone: 40, type: 50, date: 20, place: 150, message: 5000 }
const REQUIRED = ['name', 'email', 'message']
const LABELS = {
  name: 'Meno',
  email: 'E-mail',
  phone: 'Telefón',
  type: 'Typ akcie',
  date: 'Dátum akcie',
  place: 'Miesto',
  message: 'Správa',
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Vráti { data } s očistenými hodnotami, alebo { errors } s chybami polí. Pri vyplnenej pasci { spam: true }. */
export function parseInquiry(body) {
  if (!body || typeof body !== 'object') return { errors: { _form: 'invalid' } }
  if (typeof body.website === 'string' && body.website.trim()) return { spam: true }

  const data = {}
  const errors = {}
  for (const [key, max] of Object.entries(LIMITS)) {
    const raw = typeof body[key] === 'string' ? body[key] : ''
    // Jednoriadkové polia bez zalomení (idú aj do predmetu), správa si ich ponechá.
    const value = key === 'message' ? raw.replace(/\r\n?/g, '\n').trim() : raw.replace(/\s+/g, ' ').trim()
    if (value.length > max) errors[key] = 'too_long'
    data[key] = value
  }
  for (const key of REQUIRED) if (!data[key]) errors[key] = 'required'
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'invalid'
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = 'invalid'

  return Object.keys(errors).length ? { errors } : { data }
}

/** 2027-06-14 → 14. 6. 2027 */
export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${m}. ${y}`
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch])

/** Zostaví e-mail v dohodnutom tvare: predmet, textová a HTML verzia. */
export function buildInquiryMail(data, now = new Date()) {
  const values = { ...data, date: formatDate(data.date) }
  const subject = `Nový dopyt – ${values.type || 'bez typu'} · ${values.date || 'bez dátumu'} · ${values.name}`
  const sentAt = now.toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava', dateStyle: 'short', timeStyle: 'short' })

  const order = ['name', 'email', 'phone', 'type', 'date', 'place']
  const text = [
    ...order.map((k) => `${LABELS[k]}: ${values[k] || '—'}`),
    '',
    `${LABELS.message}:`,
    values.message,
    '',
    '—',
    `Odoslané z formulára na webe ${sentAt}. Odpoveď pôjde priamo na e-mail klienta.`,
  ].join('\n')

  const rows = order
    .map(
      (k) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5E7A60;vertical-align:top">${LABELS[k]}</td>` +
        `<td style="padding:4px 0">${escapeHtml(values[k] || '—')}</td></tr>`,
    )
    .join('')
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1E2A1F">` +
    `<p style="margin:0 0 16px;font-size:18px;color:#123B16"><strong>Nový dopyt z webu</strong></p>` +
    `<table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>` +
    `<p style="margin:0 0 4px;color:#5E7A60">${LABELS.message}</p>` +
    `<p style="margin:0 0 24px;white-space:pre-wrap">${escapeHtml(values.message)}</p>` +
    `<p style="margin:0;font-size:13px;color:#5E7A60">Odoslané z formulára na webe ${escapeHtml(sentAt)}. ` +
    `Odpoveď pôjde priamo na e-mail klienta.</p></div>`

  return { subject, text, html, replyTo: { name: values.name, address: values.email } }
}
