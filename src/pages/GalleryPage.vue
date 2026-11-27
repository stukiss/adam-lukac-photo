<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import { findGallery, galleries } from '../data/galleries'
import AppPhoto from '../components/AppPhoto.vue'
import PhotoMasonry from '../components/PhotoMasonry.vue'
import PhotoLightbox from '../components/PhotoLightbox.vue'
import CtaBlock from '../components/CtaBlock.vue'
import BaseButton from '../components/BaseButton.vue'

const { t, c, loc } = useI18n()
const lp = useLocalePath()
const route = useRoute()

const g = computed(() => findGallery(route.params.slug))
const idx = computed(() => galleries.indexOf(g.value))
const prev = computed(() => (idx.value > 0 ? galleries[idx.value - 1] : null))
const next = computed(() => (idx.value >= 0 && idx.value < galleries.length - 1 ? galleries[idx.value + 1] : null))
const cover = computed(() => g.value?.photos[0])
const rest = computed(() => g.value?.photos.slice(1) ?? [])

// Lightbox cez všetky fotky galérie (index 0 = úvodná fotka).
const current = ref(null)
watch(() => route.params.slug, () => (current.value = null))

watchEffect(() => {
  document.title = `${g.value ? loc(g.value.title) : t('meta.titles.gallery')} · ${t('meta.siteName')}`
})
</script>

<template>
  <template v-if="g">
    <div class="container head">
      <RouterLink :to="lp('portfolio')" class="back">← {{ t('gallery.back') }}</RouterLink>
      <div class="head__row">
        <div class="head__title">
          <p class="eyebrow">{{ c.categories[g.category].label }} · {{ g.year }}</p>
          <h1>{{ loc(g.title) }}</h1>
        </div>
        <div class="head__text">
          <p class="lead">{{ loc(g.story) }}</p>
          <p class="caption">
            <template v-if="loc(g.place)">{{ t('gallery.place') }}: {{ loc(g.place) }} · </template>
            {{ t('gallery.photosCount', { count: g.photos.length }) }}
          </p>
        </div>
      </div>
    </div>

    <section class="container section gallery">
      <button v-if="cover" type="button" class="gallery__cover" @click="current = 0">
        <AppPhoto :name="cover" eager sizes="(min-width: 1440px) 1248px, 100vw" />
      </button>
      <PhotoMasonry :photos="rest" :columns="3" external-lightbox @open="current = $event + 1" />
    </section>
    <PhotoLightbox v-if="current !== null" v-model:index="current" :photos="g.photos" @close="current = null" />

    <nav class="container pager" aria-label="Galérie">
      <RouterLink v-if="prev" :to="lp('gallery', { slug: prev.slug })" class="pager__item">
        <span class="eyebrow muted">← {{ t('gallery.prev') }}</span>
        <span class="h3">{{ loc(prev.title) }}</span>
      </RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="lp('gallery', { slug: next.slug })" class="pager__item pager__item--next">
        <span class="eyebrow muted">{{ t('gallery.next') }} →</span>
        <span class="h3">{{ loc(next.title) }}</span>
      </RouterLink>
    </nav>

    <CtaBlock :title="t('gallery.ctaTitle')" :text="t('gallery.ctaText')" secondary="offer" :secondary-label="t('common.seeOffer')" />
  </template>

  <div v-else class="container section">
    <h1>{{ t('gallery.notFound') }}</h1>
    <p style="margin-top: 24px"><BaseButton variant="link" :to="lp('portfolio')">{{ t('gallery.back') }}</BaseButton></p>
  </div>
</template>

<style scoped>
.head { display: flex; flex-direction: column; gap: var(--space-lg); padding-top: var(--space-lg); }
.back { font-weight: 500; font-size: var(--text-label); letter-spacing: .14em; text-transform: uppercase; text-decoration: none; color: var(--color-text-brand); }
.head__row { display: flex; flex-direction: column; gap: var(--space-md); }
.head__title, .head__text { display: grid; gap: 12px; }
.gallery__cover {
  display: block; width: 100%; padding: 0; margin: 0 0 var(--space-sm);
  border: 0; background: none; cursor: zoom-in;
}
.gallery__cover :deep(img) { transition: opacity .2s; }
.gallery__cover:hover :deep(img) { opacity: .92; }
.pager { display: flex; justify-content: space-between; gap: var(--space-lg); border-top: 1px solid var(--color-border-default); padding-top: var(--space-lg); }
.pager__item { display: grid; gap: 6px; text-decoration: none; color: var(--color-text-brand); }
.pager__item--next { text-align: right; }
@media (min-width: 900px) {
  .head { padding-top: var(--space-2xl); }
  .head__row { flex-direction: row; align-items: flex-end; gap: var(--space-2xl); }
  .head__title { flex: 1; }
  .head__text { flex: 1; }
  .gallery__cover { margin-bottom: var(--space-md); }
}
</style>
