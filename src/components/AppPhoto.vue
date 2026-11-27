<script setup>
// Fotka s responzívnymi veľkosťami (800 / 1600 px) a lazy-loadingom.
import { computed } from 'vue'
import { photos } from '../data/galleries'
import { photoUrl } from '../composables/useLocalePath'
import { useI18n } from '../i18n'

const props = defineProps({
  name: { type: String, required: true },
  alt: { type: String, default: null },
  sizes: { type: String, default: '(min-width: 900px) 33vw, 100vw' },
  eager: { type: Boolean, default: false },
  ratio: { type: String, default: null }, // napr. '4/5' – orezanie do pevného pomeru
})

const { loc } = useI18n()
const meta = computed(() => photos[props.name] || {})
const altText = computed(() => props.alt ?? loc(meta.value.alt) ?? '')
const dims = computed(() => (meta.value.portrait ? { w: 1067, h: 1600 } : { w: 1600, h: 1067 }))
</script>

<template>
  <img
    class="photo"
    :class="{ 'photo--cropped': ratio }"
    :style="ratio ? { aspectRatio: ratio } : null"
    :src="photoUrl(name, 1600)"
    :srcset="`${photoUrl(name, 800)} 800w, ${photoUrl(name, 1600)} 1600w`"
    :sizes="sizes"
    :width="dims.w"
    :height="dims.h"
    :alt="altText"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  />
</template>

<style scoped>
.photo { width: 100%; height: auto; background: var(--color-bg-photo-placeholder); }
.photo--cropped { object-fit: cover; }
</style>
