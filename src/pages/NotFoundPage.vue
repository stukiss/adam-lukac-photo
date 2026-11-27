<script setup>
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import BaseButton from '../components/BaseButton.vue'

const { t } = useI18n()
const lp = useLocalePath()
</script>

<template>
  <section class="container section nf">
    <p class="eyebrow">404</p>
    <h1>{{ t('notFound.title') }}</h1>
    <p class="lead muted">{{ t('notFound.text') }}</p>
    <BaseButton :to="lp('home')">{{ t('notFound.back') }}</BaseButton>
  </section>
</template>

<style scoped>
.nf { display: flex; flex-direction: column; gap: var(--space-lg); align-items: flex-start; padding-block: var(--space-2xl); }
</style>
