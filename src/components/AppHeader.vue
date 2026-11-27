<script setup>
// Hlavička zo smeru C: monogram AL + wordmark, menu v strede, tlačidlo „Napíš mi“ vpravo.
// Na mobile: monogram + wordmark a celoobrazovkové menu.
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import BaseButton from './BaseButton.vue'

const { t } = useI18n()
const lp = useLocalePath()
const route = useRoute()
const open = ref(false)

const items = ['portfolio', 'about', 'offer', 'contact']
const isActive = (page) =>
  route.meta.page === page || (page === 'portfolio' && route.meta.page === 'gallery')

watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => document.documentElement.classList.toggle('menu-open', v))
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink :to="lp('home')" class="brand" :aria-label="t('meta.siteName')">
        <span class="brand__mono" aria-hidden="true">AL</span>
        <span class="brand__word">Adam Lukac Photo</span>
      </RouterLink>

      <nav class="nav" aria-label="Hlavné menu">
        <RouterLink
          v-for="p in items"
          :key="p"
          :to="lp(p)"
          class="nav__link"
          :class="{ 'is-active': isActive(p) }"
          :aria-current="isActive(p) ? 'page' : undefined"
        >{{ t(`nav.${p}`) }}</RouterLink>
      </nav>

      <BaseButton class="header__cta" :to="lp('contact')">{{ t('nav.cta') }}</BaseButton>

      <button
        class="burger"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? t('nav.closeMenu') : t('nav.openMenu')"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>
    </div>

    <div v-show="open" id="mobile-menu" class="mobile-menu">
      <nav class="container mobile-menu__nav" aria-label="Mobilné menu">
        <RouterLink v-for="p in items" :key="p" :to="lp(p)" class="mobile-menu__link" :class="{ 'is-active': isActive(p) }">
          {{ t(`nav.${p}`) }}
        </RouterLink>
        <BaseButton :to="lp('contact')" block>{{ t('nav.cta') }}</BaseButton>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--color-bg-page) 94%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-default);
}
.header__inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-lg); height: var(--header-h); }

.brand { display: inline-flex; align-items: center; gap: var(--space-md); text-decoration: none; color: var(--color-text-brand); }
.brand__mono {
  display: grid; place-items: center; width: 32px; height: 32px;
  border: 1px solid var(--color-border-strong);
  font-weight: 500; font-size: 11px; letter-spacing: 0.08em;
}
.brand__word { text-transform: uppercase; letter-spacing: 0.2em; font-size: 13px; }

.nav, .header__cta { display: none; }

.nav__link {
  font-weight: 500; font-size: var(--text-label); letter-spacing: 0.14em; text-transform: uppercase;
  text-decoration: none; color: var(--color-text-primary);
  padding: var(--space-sm) var(--space-md); border-radius: var(--radius-full);
  transition: background-color .2s, color .2s;
}
.nav__link:hover { color: var(--color-text-brand); background: var(--color-bg-subtle); }
.nav__link.is-active { color: var(--color-text-brand); background: var(--color-bg-subtle); }

.burger { display: grid; gap: 5px; width: 40px; height: 40px; place-content: center; background: none; border: 0; cursor: pointer; margin-right: -8px; }
.burger span { display: block; width: 20px; height: 1.5px; background: var(--color-text-brand); transition: transform .2s, opacity .2s; }
.burger[aria-expanded='true'] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.burger[aria-expanded='true'] span:nth-child(2) { opacity: 0; }
.burger[aria-expanded='true'] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* backdrop-filter na .header z neho robí containing block aj pre fixed potomkov, preto absolute. */
.mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  height: calc(100vh - var(--header-h));
  height: calc(100dvh - var(--header-h));
  background: var(--color-bg-page); overflow-y: auto;
}
.mobile-menu__nav { display: flex; flex-direction: column; padding-block: var(--space-xl); }
.mobile-menu__link {
  font-size: var(--text-h2); text-decoration: none; color: var(--color-text-brand);
  padding-block: var(--space-md); border-bottom: 1px solid var(--color-border-default);
}
.mobile-menu__link.is-active { color: var(--color-text-accent); }
.mobile-menu__nav :deep(.btn) { margin-top: var(--space-xl); }

@media (min-width: 900px) {
  .brand__mono { width: 40px; height: 40px; font-size: 13px; }
  .brand__word { font-size: 16px; }
  .nav { display: flex; gap: var(--space-xs); }
  .header__cta { display: inline-flex; }
  .burger, .mobile-menu { display: none !important; }
}
</style>

<style>
html.menu-open { overflow: hidden; }
</style>
