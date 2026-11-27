import { createRouter, createWebHistory } from 'vue-router'
import { defaultLocale, locales, messages, setLocale } from './i18n'

const pages = {
  home: () => import('./pages/HomePage.vue'),
  portfolio: () => import('./pages/PortfolioPage.vue'),
  about: () => import('./pages/AboutPage.vue'),
  offer: () => import('./pages/OfferPage.vue'),
  contact: () => import('./pages/ContactPage.vue'),
}

const routes = []
for (const locale of locales) {
  const slugs = messages[locale].routes
  for (const [page, component] of Object.entries(pages)) {
    const slug = slugs[page]
    routes.push({
      path: `/${locale}${slug ? `/${slug}` : ''}`,
      name: `${page}.${locale}`,
      component,
      meta: { locale, page },
    })
  }
  routes.push({
    path: `/${locale}/${slugs.portfolio}/:slug`,
    name: `gallery.${locale}`,
    component: () => import('./pages/GalleryPage.vue'),
    meta: { locale, page: 'gallery' },
  })
  routes.push({
    path: `/${locale}/:rest(.*)*`,
    name: `notFound.${locale}`,
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { locale, page: 'notFound' },
  })
}
routes.push({ path: '/', redirect: `/${defaultLocale}` })
routes.push({ path: '/:rest(.*)*', redirect: `/${defaultLocale}` })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  setLocale(to.meta.locale || defaultLocale)
})

router.afterEach((to) => {
  const m = messages[to.meta.locale || defaultLocale].meta
  const title = m.titles[to.meta.page]
  // Stránka galérie si titulok nastaví sama (podľa názvu galérie).
  if (to.meta.page !== 'gallery') {
    document.title = to.meta.page === 'home' ? title : `${title} · ${m.siteName}`
  }
})

export default router
