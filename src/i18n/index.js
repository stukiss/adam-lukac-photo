// Jednoduchá, ľahká lokalizácia bez externej knižnice.
// Každý jazyk = jeden súbor v ./locales (napr. sk.js, cs.js, en.js). Nový jazyk sa pridá automaticky
// po vytvorení súboru – router mu vygeneruje vlastné adresy (/cs/..., /en/...).
import { computed, ref } from 'vue'

const modules = import.meta.glob('./locales/*.js', { eager: true })

export const messages = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.match(/([\w-]+)\.js$/)[1], mod.default]),
)

export const defaultLocale = 'sk'
export const locales = [defaultLocale, ...Object.keys(messages).filter((l) => l !== defaultLocale)]

const current = ref(defaultLocale)

export function setLocale(locale) {
  if (!locales.includes(locale)) return
  current.value = locale
  document.documentElement.lang = locale
}

const lookup = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

export function useI18n() {
  /** Celý obsah aktuálneho jazyka (na zoznamy, objekty, …). */
  const c = computed(() => messages[current.value])

  /** Text podľa cesty, napr. t('nav.contact') alebo t('form.sent', { name: 'Adam' }). */
  function t(path, vars) {
    let value = lookup(messages[current.value], path) ?? lookup(messages[defaultLocale], path)
    if (typeof value === 'string' && vars) {
      value = value.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
    }
    return value ?? path
  }

  /** Lokalizované pole z dát, napr. { sk: 'Svadba', en: 'Wedding' }. */
  function loc(field) {
    if (field && typeof field === 'object') return field[current.value] ?? field[defaultLocale]
    return field
  }

  return { locale: current, c, t, loc }
}
