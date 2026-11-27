<script setup>
// Mriežka fotiek v prirodzených pomeroch (masonry cez CSS stĺpce) + lightbox po kliknutí.
import { ref } from 'vue'
import AppPhoto from './AppPhoto.vue'
import PhotoLightbox from './PhotoLightbox.vue'

const props = defineProps({
  photos: { type: Array, required: true },
  columns: { type: Number, default: 3 },
  // Ak je zapnuté, lightbox si rieši rodič; mriežka len emituje `open` s indexom.
  externalLightbox: { type: Boolean, default: false },
})
const emit = defineEmits(['open'])
const current = ref(null)

function open(i) {
  emit('open', i)
  if (!props.externalLightbox) current.value = i
}
</script>

<template>
  <div class="masonry" :style="{ '--cols': columns }">
    <button v-for="(p, i) in photos" :key="p" type="button" class="masonry__item" @click="open(i)">
      <AppPhoto :name="p" :sizes="`(min-width: 900px) ${Math.round(100 / columns)}vw, 50vw`" />
    </button>
  </div>
  <PhotoLightbox v-if="!externalLightbox && current !== null" v-model:index="current" :photos="photos" @close="current = null" />
</template>

<style scoped>
.masonry { columns: 2; column-gap: var(--space-sm); }
.masonry__item {
  display: block; width: 100%; padding: 0; margin: 0 0 var(--space-sm);
  border: 0; background: none; cursor: zoom-in; break-inside: avoid;
}
.masonry__item :deep(img) { transition: opacity .2s; }
.masonry__item:hover :deep(img) { opacity: .92; }
@media (min-width: 900px) {
  .masonry { columns: var(--cols); column-gap: var(--space-md); }
  .masonry__item { margin-bottom: var(--space-md); }
}
</style>
