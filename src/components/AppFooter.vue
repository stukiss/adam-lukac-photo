<script setup>
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import { site } from '../data/site'

const { t } = useI18n()
const lp = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="caption">© {{ year }} Adam Lukac Photo · {{ t('footer.tagline') }}</p>
      <p class="caption footer__links">
        <a v-if="site.instagram.url" :href="site.instagram.url" target="_blank" rel="noopener">Instagram</a>
        <a v-if="site.email" :href="`mailto:${site.email}`">E-mail</a>
        <RouterLink :to="lp('contact')">{{ t('nav.contact') }}</RouterLink>
        <span>{{ t('footer.region') }}</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer { margin-top: var(--section-gap); }
.footer__inner {
  display: flex; flex-direction: column; gap: var(--space-sm);
  border-top: 1px solid var(--color-border-default);
  padding-top: var(--space-lg); padding-bottom: var(--space-xl);
}
.footer__links { display: flex; flex-wrap: wrap; gap: var(--space-xs) var(--space-md); }
.footer__links a { text-decoration: none; }
.footer__links a:hover { color: var(--color-text-brand); }
@media (min-width: 900px) {
  .footer__inner { flex-direction: row; justify-content: space-between; }
}
</style>
