<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import { categories, galleries } from '../data/galleries'
import PageIntro from '../components/PageIntro.vue'
import PhotoMasonry from '../components/PhotoMasonry.vue'
import GalleryCard from '../components/GalleryCard.vue'
import CtaBlock from '../components/CtaBlock.vue'

const { t, c, loc } = useI18n()
const lp = useLocalePath()
const route = useRoute()
const router = useRouter()

// Filter je v adrese (?kategoria=svadby), takže sa dá zdieľať a funguje tlačidlo Späť.
const active = computed(() => (categories.includes(route.query.kategoria) ? route.query.kategoria : 'all'))
const setFilter = (cat) => router.replace({ query: cat === 'all' ? {} : { kategoria: cat } })

const list = computed(() => galleries.filter((g) => active.value === 'all' || g.category === active.value))
const featured = computed(() => list.value.flatMap((g) => g.featured))
</script>

<template>
  <div class="container">
    <PageIntro :eyebrow="t('portfolio.eyebrow')" :title="t('portfolio.title')" :lead="t('portfolio.lead')">
      <div class="filter" role="group" :aria-label="t('portfolio.filterLabel')">
        <button
          v-for="cat in ['all', ...categories]"
          :key="cat"
          type="button"
          class="chip"
          :class="{ 'is-active': active === cat }"
          :aria-pressed="active === cat"
          @click="setFilter(cat)"
        >{{ cat === 'all' ? t('portfolio.filterAll') : c.categories[cat].name }}</button>
      </div>
    </PageIntro>
  </div>

  <section class="container section">
    <PhotoMasonry v-if="featured.length" :photos="featured" />
    <p v-else class="muted empty">{{ t('portfolio.emptyCategory') }}</p>
  </section>

  <section v-if="list.length" class="container section">
    <div class="head">
      <h2>{{ t('portfolio.galleriesTitle') }}</h2>
      <p class="muted">{{ t('portfolio.galleriesText') }}</p>
    </div>
    <div class="grid">
      <GalleryCard
        v-for="g in list"
        :key="g.slug"
        :photo="g.cover"
        :title="loc(g.title)"
        :meta="`${c.categories[g.category].label} · ${g.year}`"
        :to="lp('gallery', { slug: g.slug })"
      />
    </div>
  </section>

  <CtaBlock :secondary="'offer'" :secondary-label="t('common.seeOffer')" />
</template>

<style scoped>
.filter {
  display: flex; gap: var(--space-xs); margin-top: var(--space-md);
  overflow-x: auto; scrollbar-width: none; margin-inline: calc(-1 * var(--gutter)); padding-inline: var(--gutter);
}
.filter::-webkit-scrollbar { display: none; }
.chip {
  flex: none; border: 0; background: none; cursor: pointer;
  font-weight: 500; font-size: var(--text-label); letter-spacing: .14em; text-transform: uppercase;
  padding: var(--space-sm) var(--space-md); border-radius: var(--radius-full); color: var(--color-text-primary);
}
.chip:hover { background: var(--color-bg-subtle); }
.chip.is-active { background: var(--color-bg-subtle); color: var(--color-text-brand); }
.head { display: grid; gap: var(--space-sm); margin-bottom: var(--space-xl); }
.grid { display: grid; gap: var(--space-xl); }
.empty { padding-block: var(--space-2xl); }
@media (min-width: 900px) {
  .filter { margin-inline: 0; padding-inline: 0; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
