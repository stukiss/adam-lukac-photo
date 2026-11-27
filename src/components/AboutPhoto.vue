<script setup>
// Fotka autora. Kým nie je nastavená v data/site.js, zobrazí sa decentný blok s monogramom.
import { site } from '../data/site'
import { useI18n } from '../i18n'
import AppPhoto from './AppPhoto.vue'

defineProps({ ratio: { type: String, default: '4/5' } })
const { t } = useI18n()
</script>

<template>
  <AppPhoto v-if="site.aboutPhoto" :name="site.aboutPhoto" :ratio="ratio" alt="Adam Lukac" />
  <div v-else class="placeholder" :style="{ aspectRatio: ratio }" role="img" aria-label="Adam Lukac">
    <span class="placeholder__mono">AL</span>
    <span class="caption">{{ t('common.photoSoon') }}</span>
  </div>
</template>

<style scoped>
.placeholder {
  width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-md);
  background: var(--color-bg-photo-placeholder);
}
.placeholder__mono {
  display: grid; place-items: center; width: 72px; height: 72px;
  border: 1px solid var(--color-border-strong); color: var(--color-text-brand);
  font-weight: 500; letter-spacing: .1em; font-size: 20px;
}
</style>
