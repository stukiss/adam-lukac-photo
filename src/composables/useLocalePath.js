import { useI18n } from '../i18n'

/** Odkaz na stránku v aktuálnom jazyku: lp('about'), lp('gallery', { slug: 'nika-patrik' }). */
export function useLocalePath() {
  const { locale } = useI18n()
  return (page, params) => ({ name: `${page}.${locale.value}`, params })
}

/** URL fotky v danej veľkosti (800 alebo 1600 px). */
export const photoUrl = (name, size = 1600) => `${import.meta.env.BASE_URL}photos/${name}-${size}.jpg`
