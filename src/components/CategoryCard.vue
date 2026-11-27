<script setup>
import AppPhoto from './AppPhoto.vue'

defineProps({
  photo: { type: String, required: true },
  title: String,
  text: String,
  to: [String, Object],
})
</script>

<template>
  <RouterLink :to="to" class="card">
    <div class="card__media"><AppPhoto :name="photo" ratio="389/420" alt="" /></div>
    <h3>{{ title }}</h3>
    <p class="caption">{{ text }}</p>
  </RouterLink>
</template>

<style scoped>
.card { display: flex; flex-direction: column; gap: var(--space-sm); text-decoration: none; color: inherit; }
.card__media { overflow: hidden; margin-bottom: var(--space-sm); }
.card__media :deep(img) { transition: transform .6s ease; }
.card:hover .card__media :deep(img) { transform: scale(1.03); }
</style>
