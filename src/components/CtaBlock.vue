<script setup>
// Centrovaný blok s výzvou na kontakt (zo smeru B).
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import BaseButton from './BaseButton.vue'

defineProps({
  title: { type: String, default: null },
  text: { type: String, default: null },
  primary: { type: String, default: null },
  secondary: { type: String, default: 'portfolio' }, // stránka pre textový odkaz
  secondaryLabel: { type: String, default: null },
})
const { t } = useI18n()
const lp = useLocalePath()
</script>

<template>
  <section class="container section">
    <div class="cta">
      <h2>{{ title || t('cta.title') }}</h2>
      <p>{{ text || t('cta.text') }}</p>
      <div class="cta__actions">
        <BaseButton :to="lp('contact')">{{ primary || t('common.writeMe') }}</BaseButton>
        <BaseButton v-if="secondary" variant="link" :to="lp(secondary)">
          {{ secondaryLabel || t('common.seePortfolio') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 20px;
  background: var(--color-bg-subtle); border-radius: var(--radius-md);
  padding: var(--space-xl) var(--space-lg);
}
.cta__actions { display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); }
@media (min-width: 900px) {
  .cta { padding: var(--space-2xl); }
  .cta__actions { flex-direction: row; gap: var(--space-lg); }
}
</style>
