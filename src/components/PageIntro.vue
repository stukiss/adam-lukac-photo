<script setup>
defineProps({
  eyebrow: String,
  title: String,
  lead: String,
})
</script>

<template>
  <div class="intro">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p v-if="lead" class="lead">{{ lead }}</p>
    <slot />
  </div>
</template>

<style scoped>
.intro { display: flex; flex-direction: column; gap: var(--space-md); padding-top: var(--space-lg); }
.lead { max-width: 760px; }
@media (min-width: 900px) { .intro { padding-top: var(--space-2xl); } }
</style>
