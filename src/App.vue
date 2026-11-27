<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useI18n } from './i18n'

const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#main">{{ t('nav.skip') }}</a>
  <AppHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>
  </main>
  <AppFooter />
</template>

<style>
#app { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; outline: none; }
.skip-link {
  position: absolute; left: var(--space-md); top: -100px; z-index: 100;
  background: var(--color-bg-brand); color: var(--color-text-on-brand);
  padding: var(--space-sm) var(--space-md); border-radius: var(--radius-full);
}
.skip-link:focus { top: var(--space-md); }
</style>
