<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n'
import { categories } from '../data/galleries'
import { site } from '../data/site'
import BaseButton from '../components/BaseButton.vue'

const { t, c } = useI18n()
const route = useRoute()

const form = reactive({
  name: '', email: '', phone: '',
  type: categories.includes(route.query.typ) ? route.query.typ : '',
  date: '', place: '', message: '',
  website: '', // pasca na spam roboty – skryté pole, človek ho nevyplní
})
const errors = reactive({})
const status = ref('idle') // idle | sending | sent | error

const required = ['name', 'email', 'message']

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  for (const k of required) if (!form[k].trim()) errors[k] = t('contact.required')
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('contact.invalidEmail')
  return Object.keys(errors).length === 0
}

const typeLabel = () => (form.type === 'other' ? t('contact.typeOther') : c.value.categories[form.type]?.label || '')

async function submit() {
  if (form.website || !validate()) return
  status.value = 'sending'
  // Pasca (website) ide aj na server – roboti, ktorí obídu JS, sa odfiltrujú tam.
  const payload = { ...form, type: typeLabel() }

  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    // Chyby polí, ktoré formulár vie ukázať (meno, e-mail, správa); ostatné spadnú do všeobecnej chyby.
    if (res.status === 400 && data.fields && Object.keys(data.fields).every((k) => required.includes(k))) {
      for (const [k, code] of Object.entries(data.fields)) {
        errors[k] = code === 'required' ? t('contact.required') : code === 'too_long' ? t('contact.tooLong') : k === 'email' ? t('contact.invalidEmail') : t('contact.invalid')
      }
      status.value = 'idle'
      return
    }
    if (!res.ok || !data.ok) throw new Error(data.error || res.statusText)
    status.value = 'sent'
  } catch (e) {
    console.error(e)
    status.value = 'error'
  }
}

const info = [
  ['email', () => (site.email ? { text: site.email, href: `mailto:${site.email}` } : { text: 'doplniť' })],
  ['instagram', () => (site.instagram.url ? { text: site.instagram.handle, href: site.instagram.url } : { text: '@doplniť' })],
  ['phone', () => (site.phone ? { text: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` } : null)],
  ['region', () => ({ text: t('contact.regionValue') })],
]
</script>

<template>
  <section class="container contact">
    <div class="contact__info">
      <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
      <h1>{{ t('contact.title') }}</h1>
      <p class="lead">{{ t('contact.lead') }}</p>
      <dl class="details">
        <template v-for="[key, get] in info" :key="key">
          <div v-if="get()" class="details__row">
            <dt class="eyebrow muted">{{ t(`contact.info.${key}`) }}</dt>
            <dd>
              <a v-if="get().href" :href="get().href">{{ get().text }}</a>
              <span v-else>{{ get().text }}</span>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <form class="form" novalidate @submit.prevent="submit">
      <h2 class="h3">{{ t('contact.formTitle') }}</h2>

      <div v-if="status === 'sent'" class="notice" role="status">
        {{ t('contact.success') }}
      </div>

      <template v-else>
        <div class="field">
          <label for="f-name">{{ t('contact.fields.name.label') }} *</label>
          <input id="f-name" v-model="form.name" autocomplete="name" :placeholder="t('contact.fields.name.placeholder')" :aria-invalid="!!errors.name" />
          <p v-if="errors.name" class="field__err">{{ errors.name }}</p>
        </div>

        <div class="row">
          <div class="field">
            <label for="f-email">{{ t('contact.fields.email.label') }} *</label>
            <input id="f-email" v-model="form.email" type="email" autocomplete="email" :placeholder="t('contact.fields.email.placeholder')" :aria-invalid="!!errors.email" />
            <p v-if="errors.email" class="field__err">{{ errors.email }}</p>
          </div>
          <div class="field">
            <label for="f-phone">{{ t('contact.fields.phone.label') }}</label>
            <input id="f-phone" v-model="form.phone" type="tel" autocomplete="tel" :placeholder="t('contact.fields.phone.placeholder')" />
          </div>
        </div>

        <div class="field">
          <label for="f-type">{{ t('contact.fields.type.label') }}</label>
          <select id="f-type" v-model="form.type">
            <option value="" disabled>{{ t('contact.fields.type.placeholder') }}</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ c.categories[cat].label }}</option>
            <option value="other">{{ t('contact.typeOther') }}</option>
          </select>
        </div>

        <div class="row">
          <div class="field">
            <label for="f-date">{{ t('contact.fields.date.label') }}</label>
            <input id="f-date" v-model="form.date" type="date" />
          </div>
          <div class="field">
            <label for="f-place">{{ t('contact.fields.place.label') }}</label>
            <input id="f-place" v-model="form.place" :placeholder="t('contact.fields.place.placeholder')" />
          </div>
        </div>

        <div class="field">
          <label for="f-msg">{{ t('contact.fields.message.label') }} *</label>
          <textarea id="f-msg" v-model="form.message" rows="6" :placeholder="t('contact.fields.message.placeholder')" :aria-invalid="!!errors.message" />
          <p v-if="errors.message" class="field__err">{{ errors.message }}</p>
        </div>

        <input v-model="form.website" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true" name="website" />

        <p class="caption">{{ t('contact.consent') }}</p>
        <p v-if="status === 'error'" class="field__err" role="alert">{{ t('contact.error') }}</p>
        <BaseButton type="submit" class="form__submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? t('contact.sending') : t('contact.submit') }}
        </BaseButton>
      </template>
    </form>
  </section>
</template>

<style scoped>
.contact { display: flex; flex-direction: column; gap: var(--space-xl); padding-top: var(--space-lg); }
.contact__info { display: flex; flex-direction: column; gap: var(--space-lg); }
.details { margin: 0; }
.details__row { border-top: 1px solid var(--color-border-default); padding-block: var(--space-md); display: grid; gap: 4px; }
.details dd { margin: 0; }
.details a { text-decoration: none; color: var(--color-text-brand); }

.form {
  display: flex; flex-direction: column; gap: 20px;
  border: 1px solid var(--color-border-default); border-radius: var(--radius-md); padding: var(--space-lg) 20px;
}
.row { display: grid; gap: 20px; }
.field { display: grid; gap: var(--space-sm); }
.field label { font-size: var(--text-caption); }
.field input, .field select, .field textarea {
  width: 100%; padding: 14px var(--space-md);
  background: var(--color-bg-subtle); border: 1px solid var(--color-border-default); border-radius: var(--radius-sm);
  transition: border-color .2s;
}
.field textarea { resize: vertical; min-height: 140px; }
.field input::placeholder, .field textarea::placeholder { color: var(--color-text-secondary); }
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: var(--color-border-strong); }
.field [aria-invalid='true'] { border-color: #a14a3b; }
.field__err { color: #a14a3b; font-size: var(--text-caption); }
.notice { background: var(--color-bg-subtle); border-radius: var(--radius-md); padding: var(--space-lg); color: var(--color-text-brand); }
.form__submit { align-self: stretch; }

@media (min-width: 900px) {
  .contact { flex-direction: row; gap: var(--space-3xl); padding-top: var(--space-2xl); }
  .contact__info { flex: 0 0 38%; }
  .form { flex: 1; padding: var(--space-xl); }
  .row { grid-template-columns: 1fr 1fr; gap: var(--space-md); }
  .form__submit { align-self: flex-start; }
}
</style>
