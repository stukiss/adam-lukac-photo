<script setup>
// Jednoduchý lightbox: šípky / Esc na klávesnici, potiahnutie prstom na mobile.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { photos as meta } from '../data/galleries'
import { photoUrl } from '../composables/useLocalePath'
import { useI18n } from '../i18n'

const props = defineProps({ photos: Array, index: Number })
const emit = defineEmits(['update:index', 'close'])
const { t, loc } = useI18n()

const name = computed(() => props.photos[props.index])
const go = (d) => emit('update:index', (props.index + d + props.photos.length) % props.photos.length)
const closeBtn = ref(null)

function onKey(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
}
let x0 = null
const touchStart = (e) => (x0 = e.touches[0].clientX)
const touchEnd = (e) => {
  if (x0 === null) return
  const dx = e.changedTouches[0].clientX - x0
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  x0 = null
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  document.documentElement.style.overflow = 'hidden'
  closeBtn.value?.focus()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="lb" role="dialog" aria-modal="true" @click.self="emit('close')" @touchstart.passive="touchStart" @touchend="touchEnd">
      <img class="lb__img" :src="photoUrl(name, 1600)" :alt="loc(meta[name]?.alt) || ''" />
      <button ref="closeBtn" class="lb__btn lb__close" type="button" :aria-label="t('gallery.lightboxClose')" @click="emit('close')">✕</button>
      <button class="lb__btn lb__prev" type="button" :aria-label="t('gallery.lightboxPrev')" @click="go(-1)">←</button>
      <button class="lb__btn lb__next" type="button" :aria-label="t('gallery.lightboxNext')" @click="go(1)">→</button>
      <p class="lb__count">{{ index + 1 }} / {{ photos.length }}</p>
    </div>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed; inset: 0; z-index: 200; display: grid; place-items: center;
  background: rgba(18, 22, 18, .94); padding: 56px 16px;
}
.lb__img { max-width: 100%; max-height: 100%; object-fit: contain; }
.lb__btn {
  position: absolute; width: 48px; height: 48px; border-radius: var(--radius-full);
  border: 1px solid rgba(250, 247, 236, .3); background: rgba(18, 22, 18, .4);
  color: var(--color-text-on-brand); font-size: 18px; cursor: pointer;
}
.lb__btn:hover { background: rgba(250, 247, 236, .12); }
.lb__close { top: 12px; right: 12px; }
.lb__prev { left: 12px; top: 50%; translate: 0 -50%; }
.lb__next { right: 12px; top: 50%; translate: 0 -50%; }
.lb__count { position: absolute; bottom: 16px; color: rgba(250, 247, 236, .7); font-size: var(--text-caption); }
@media (max-width: 899px) { .lb__prev, .lb__next { top: auto; bottom: 8px; translate: none; } }
</style>
