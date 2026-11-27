<script setup>
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import { categories, categoryCovers, heroPhoto } from '../data/galleries'
import AppPhoto from '../components/AppPhoto.vue'
import AboutPhoto from '../components/AboutPhoto.vue'
import BaseButton from '../components/BaseButton.vue'
import CategoryCard from '../components/CategoryCard.vue'
import CtaBlock from '../components/CtaBlock.vue'

const { t, c } = useI18n()
const lp = useLocalePath()
</script>

<template>
  <!-- Úvod -->
  <section class="container hero">
    <div class="hero__text">
      <div class="accent-line" />
      <p class="eyebrow">{{ t('home.eyebrow') }}</p>
      <h1 class="display">{{ t('home.title') }}</h1>
      <p class="lead">{{ t('home.lead') }}</p>
      <div class="hero__actions">
        <BaseButton :to="lp('contact')">{{ t('common.writeMe') }}</BaseButton>
        <BaseButton variant="secondary" :to="lp('portfolio')">{{ t('common.seePortfolio') }}</BaseButton>
      </div>
    </div>
    <div class="hero__media">
      <AppPhoto :name="heroPhoto" :alt="t('home.heroAlt')" ratio="560/680" eager sizes="(min-width: 900px) 45vw, 100vw" />
    </div>
  </section>

  <!-- Čo fotím -->
  <section class="container section">
    <div class="section-head">
      <h2>{{ t('home.categoriesTitle') }}</h2>
      <BaseButton variant="link" :to="lp('portfolio')">{{ t('common.wholePortfolio') }}</BaseButton>
    </div>
    <div class="grid-3">
      <CategoryCard
        v-for="cat in categories"
        :key="cat"
        :photo="categoryCovers[cat]"
        :title="c.categories[cat].name"
        :text="c.categories[cat].text"
        :to="{ ...lp('portfolio'), query: { kategoria: cat } }"
      />
    </div>
  </section>

  <!-- Ako to prebieha -->
  <section class="container section">
    <h2 class="block-title">{{ t('home.stepsTitle') }}</h2>
    <ol class="steps">
      <li v-for="(s, i) in c.home.steps" :key="s.title" class="rule-top">
        <p class="eyebrow">{{ String(i + 1).padStart(2, '0') }}</p>
        <h3>{{ s.title }}</h3>
        <p class="muted">{{ s.text }}</p>
      </li>
    </ol>
  </section>

  <!-- O mne -->
  <section class="container section about">
    <div class="about__media"><AboutPhoto ratio="480/560" /></div>
    <div class="about__text">
      <p class="eyebrow">{{ t('home.aboutEyebrow') }}</p>
      <h2>{{ t('home.aboutTitle') }}</h2>
      <p class="lead">{{ t('home.aboutText') }}</p>
      <BaseButton variant="link" :to="lp('about')">{{ t('common.moreAboutMe') }}</BaseButton>
    </div>
  </section>

  <!-- Referencie (zobrazia sa, keď ich doplníš do sk.js) -->
  <section v-if="c.home.testimonials.length" class="container section quotes">
    <p class="eyebrow">{{ t('home.testimonialsEyebrow') }}</p>
    <figure v-for="q in c.home.testimonials" :key="q.text">
      <blockquote class="h2">„{{ q.text }}“</blockquote>
      <figcaption class="caption">— {{ q.author }}</figcaption>
    </figure>
  </section>

  <CtaBlock />
</template>

<style scoped>
.hero { display: flex; flex-direction: column-reverse; gap: var(--space-xl); padding-top: var(--space-lg); }
.hero__text { display: flex; flex-direction: column; gap: var(--space-lg); }
.hero__actions { display: flex; flex-direction: column; gap: var(--space-md); }
.section-head { display: flex; justify-content: space-between; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl); }
.block-title { margin-bottom: var(--space-xl); }
.grid-3 { display: grid; gap: var(--space-xl); }
.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-lg); }
.steps li { display: flex; flex-direction: column; gap: 12px; }
.about { display: flex; flex-direction: column; gap: var(--space-lg); }
.about__text { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
.quotes { text-align: center; display: grid; gap: var(--space-xl); justify-items: center; }
.quotes figure { margin: 0; max-width: 880px; display: grid; gap: var(--space-md); }
.quotes blockquote { margin: 0; color: var(--color-text-brand); }

@media (min-width: 900px) {
  .hero { flex-direction: row; align-items: center; gap: var(--space-2xl); padding-top: var(--space-2xl); }
  .hero__text { flex: 1; }
  .hero__media { flex: 0 0 45%; }
  .hero__actions { flex-direction: row; }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .steps { grid-template-columns: repeat(4, 1fr); gap: var(--space-xl); }
  .about { flex-direction: row; align-items: center; gap: var(--space-2xl); }
  .about__media { flex: 0 0 38%; }
}
</style>
