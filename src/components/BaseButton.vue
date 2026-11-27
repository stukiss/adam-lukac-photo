<script setup>
// Komponent Button z Figmy: variant primary / secondary / link, zaoblený tvar (smer B).
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | link
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--block': block }]"
  >
    <span><slot /></span>
    <span v-if="variant === 'link'" class="btn__arrow" aria-hidden="true">→</span>
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  font-family: var(--font-label); font-weight: 500; font-size: var(--text-label);
  letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none;
  border: 1px solid transparent; border-radius: var(--radius-full);
  padding: var(--space-md) var(--space-xl); cursor: pointer; background: none;
  transition: background-color .2s, color .2s, border-color .2s, gap .2s;
  white-space: nowrap;
}
.btn--primary { background: var(--color-action-primary); color: var(--color-text-on-brand); }
.btn--primary:hover { background: var(--color-action-primary-hover); }
.btn--secondary { border-color: var(--color-border-strong); color: var(--color-text-brand); }
.btn--secondary:hover { background: var(--color-bg-subtle); }
.btn--link { padding: var(--space-sm) 0; color: var(--color-text-brand); border-radius: 0; }
.btn--link:hover { gap: 18px; color: var(--color-action-primary-hover); }
.btn--block { width: 100%; }
.btn:disabled { opacity: .6; cursor: default; }
</style>
