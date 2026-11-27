<script setup>
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import AboutPhoto from '../components/AboutPhoto.vue'
import AppPhoto from '../components/AppPhoto.vue'
import BaseButton from '../components/BaseButton.vue'
import CtaBlock from '../components/CtaBlock.vue'

const { t, c } = useI18n()
const lp = useLocalePath()
</script>

<template>
  <section class="container intro">
    <div class="intro__media"><AboutPhoto ratio="520/640" /></div>
    <div class="intro__text">
      <p class="eyebrow">{{ t('about.eyebrow') }}</p>
      <h1>{{ t('about.title') }}</h1>
      <p class="lead">{{ t('about.lead') }}</p>
      <p>{{ t('about.text') }}</p>
      <BaseButton :to="lp('contact')">{{ t('common.writeMe') }}</BaseButton>
    </div>
  </section>

  <section class="container section">
    <h2 class="block-title">{{ t('about.howTitle') }}</h2>
    <div class="cols">
      <div v-for="h in c.about.how" :key="h.title" class="rule-top col">
        <h3>{{ h.title }}</h3>
        <p class="muted">{{ h.text }}</p>
      </div>
    </div>
  </section>

  <section class="container section off">
    <div class="off__text">
      <p class="eyebrow">{{ t('about.offEyebrow') }}</p>
      <h2>{{ t('about.offTitle') }}</h2>
      <p class="lead">{{ t('about.offText') }}</p>
    </div>
    <div class="off__media"><AppPhoto name="stuzkova-07" ratio="4/3" sizes="(min-width: 900px) 45vw, 100vw" /></div>
  </section>

  <section class="container section">
    <div class="rule-top tech">
      <p class="eyebrow">{{ t('about.techEyebrow') }}</p>
      <p>{{ t('about.techText') }}</p>
    </div>
  </section>

  <CtaBlock :title="t('about.ctaTitle')" :text="t('about.ctaText')" />
</template>

<style scoped>
.intro { display: flex; flex-direction: column; gap: var(--space-xl); padding-top: var(--space-lg); }
.intro__text { display: flex; flex-direction: column; gap: var(--space-lg); align-items: flex-start; }
.block-title { margin-bottom: var(--space-xl); }
.cols { display: grid; gap: var(--space-lg); }
.col { display: grid; gap: 12px; align-content: start; }
.off { display: flex; flex-direction: column; gap: var(--space-lg); }
.off__text { display: flex; flex-direction: column; gap: 20px; }
.tech { display: grid; gap: 12px; max-width: 880px; }
@media (min-width: 900px) {
  .intro { flex-direction: row; align-items: center; gap: 80px; padding-top: var(--space-2xl); }
  .intro__media { flex: 0 0 42%; }
  .cols { grid-template-columns: repeat(3, 1fr); gap: var(--space-xl); }
  .off { flex-direction: row; align-items: center; gap: 80px; }
  .off__text, .off__media { flex: 1; }
}
</style>
