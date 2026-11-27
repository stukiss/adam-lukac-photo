<script setup>
import AppPhoto from './AppPhoto.vue'
import { useI18n } from '../i18n'

defineProps({
  photo: { type: String, required: true },
  title: String,
  meta: String,
  to: [String, Object],
})
const { t } = useI18n()
</script>

<template>
  <RouterLink :to="to" class="gcard">
    <div class="gcard__media"><AppPhoto :name="photo" ratio="3/2" alt="" /></div>
    <p class="eyebrow">{{ meta }}</p>
    <h3>{{ title }}</h3>
    <span class="gcard__link">{{ t('common.seeGallery') }} <span aria-hidden="true">→</span></span>
  </RouterLink>
</template>

<style scoped>
.gcard { display: flex; flex-direction: column; gap: var(--space-sm); text-decoration: none; color: inherit; }
.gcard__media { overflow: hidden; margin-bottom: var(--space-xs); }
.gcard__media :deep(img) { transition: transform .6s ease; }
.gcard:hover .gcard__media :deep(img) { transform: scale(1.03); }
.gcard__link {
  font-weight: 500; font-size: var(--text-label); letter-spacing: .14em; text-transform: uppercase;
  color: var(--color-text-brand);
}
</style>
