<script setup>
import { useI18n } from '../i18n'
import { useLocalePath } from '../composables/useLocalePath'
import PageIntro from '../components/PageIntro.vue'
import BaseButton from '../components/BaseButton.vue'
import CtaBlock from '../components/CtaBlock.vue'

const { t, c } = useI18n()
const lp = useLocalePath()
</script>

<template>
  <div class="container">
    <PageIntro :eyebrow="t('offer.eyebrow')" :title="t('offer.title')" :lead="t('offer.lead')" />
  </div>

  <!-- Balíčky -->
  <section class="container section packages">
    <article v-for="p in c.offer.packages" :key="p.category" class="pkg">
      <p class="eyebrow">{{ c.categories[p.category].name }}</p>
      <div>
        <p class="h2 pkg__price">{{ p.price }}</p>
        <p class="caption">{{ t('offer.priceNote') }}</p>
      </div>
      <ul class="pkg__list">
        <li v-for="i in p.items" :key="i">{{ i }}</li>
      </ul>
      <BaseButton variant="secondary" :to="{ ...lp('contact'), query: { typ: p.category } }">{{ t('common.requestQuote') }}</BaseButton>
    </article>
  </section>

  <!-- Vzor cenovej ponuky -->
  <section class="container section quote">
    <div class="quote__head">
      <p class="eyebrow">{{ t('offer.quote.eyebrow') }}</p>
      <h2>{{ t('offer.quote.title') }}</h2>
      <p class="muted">{{ t('offer.quote.text') }}</p>
    </div>

    <article class="doc" aria-label="Vzor cenovej ponuky">
      <header class="doc__top">
        <div>
          <p class="doc__brand">Adam Lukac Photo</p>
          <p class="caption">{{ t('offer.quote.from') }}</p>
        </div>
        <div class="doc__num">
          <p class="eyebrow">{{ t('offer.quote.number') }}</p>
          <p class="caption">{{ t('offer.quote.issued') }}</p>
        </div>
      </header>

      <dl class="doc__meta">
        <div v-for="m in c.offer.quote.meta" :key="m.label">
          <dt class="eyebrow muted">{{ m.label }}</dt>
          <dd>{{ m.value }}</dd>
        </div>
      </dl>

      <table class="doc__table">
        <thead>
          <tr>
            <th scope="col">{{ c.offer.quote.head.item }}</th>
            <th scope="col">{{ c.offer.quote.head.qty }}</th>
            <th scope="col">{{ c.offer.quote.head.price }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in c.offer.quote.rows" :key="r.item">
            <td>{{ r.item }}</td>
            <td>{{ r.qty }}</td>
            <td>{{ r.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2" class="h3">{{ t('offer.quote.total') }}</th>
            <td class="h3">{{ t('offer.quote.totalValue') }}</td>
          </tr>
        </tfoot>
      </table>

      <ul class="doc__notes caption">
        <li v-for="n in c.offer.quote.notes" :key="n">{{ n }}</li>
      </ul>
    </article>
  </section>

  <!-- FAQ -->
  <section class="container section faq">
    <h2>{{ t('offer.faqTitle') }}</h2>
    <div class="faq__list">
      <details v-for="f in c.offer.faq" :key="f.q" class="faq__item">
        <summary class="h3">{{ f.q }}</summary>
        <p class="muted">{{ f.a }}</p>
      </details>
    </div>
  </section>

  <CtaBlock :title="t('offer.ctaTitle')" :text="t('offer.ctaText')" :primary="t('common.requestQuote')" />
</template>

<style scoped>
.packages { display: grid; gap: var(--space-md); }
.pkg {
  display: flex; flex-direction: column; gap: var(--space-md); align-items: flex-start;
  border: 1px solid var(--color-border-default); border-radius: var(--radius-md); padding: var(--space-lg);
}
.pkg__price { color: var(--color-text-brand); }
.pkg__list { list-style: none; margin: 0; padding: var(--space-md) 0 0; width: 100%; border-top: 1px solid var(--color-border-default); display: grid; gap: 10px; flex: 1; }
.pkg__list li::before { content: '—'; margin-right: 10px; color: var(--color-accent-brass); }

.quote { display: flex; flex-direction: column; gap: var(--space-lg); }
.quote__head { display: grid; gap: var(--space-sm); }
.doc {
  width: 100%; max-width: 880px; align-self: center;
  background: var(--color-bg-page); border: 1px solid var(--color-border-default);
  box-shadow: 0 12px 40px rgba(18, 23, 18, .08);
  padding: var(--space-lg) 20px; display: grid; gap: 28px;
}
.doc__top { display: flex; flex-direction: column; gap: 12px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border-default); }
.doc__brand { text-transform: uppercase; letter-spacing: .2em; color: var(--color-text-brand); }
.doc__meta { display: grid; gap: 12px; margin: 0; }
.doc__meta dd { margin: 4px 0 0; }
.doc__table { width: 100%; border-collapse: collapse; }
.doc__table th, .doc__table td { text-align: left; padding: 14px 8px 14px 0; border-bottom: 1px solid var(--color-border-default); vertical-align: top; font-weight: 400; }
.doc__table thead th { font-size: var(--text-caption); color: var(--color-text-secondary); padding-block: 8px; }
.doc__table th:nth-child(2), .doc__table td:nth-child(2) { width: 18%; }
.doc__table th:last-child, .doc__table td:last-child { text-align: right; width: 20%; padding-right: 0; }
.doc__table tfoot th, .doc__table tfoot td { border-bottom: 0; padding-top: 20px; color: var(--color-text-brand); }
.doc__notes { margin: 0; padding: 20px 0 0 18px; border-top: 1px solid var(--color-border-default); display: grid; gap: 6px; }

.faq { display: grid; gap: var(--space-lg); }
.faq__item { border-top: 1px solid var(--color-border-default); padding-block: 20px; }
.faq__item summary { cursor: pointer; list-style: none; display: flex; justify-content: space-between; gap: var(--space-md); color: var(--color-text-brand); }
.faq__item summary::-webkit-details-marker { display: none; }
.faq__item summary::after { content: '+'; color: var(--color-accent-brass); transition: transform .2s; }
.faq__item[open] summary::after { transform: rotate(45deg); }
.faq__item p { margin-top: var(--space-sm); max-width: 720px; }

@media (min-width: 900px) {
  .packages { grid-template-columns: repeat(3, 1fr); gap: var(--space-xl); }
  .pkg { padding: var(--space-xl) 32px; }
  .quote { align-items: center; text-align: center; gap: var(--space-xl); }
  .doc { text-align: left; padding: 48px 56px; }
  .doc__top { flex-direction: row; justify-content: space-between; }
  .doc__num { text-align: right; }
  .doc__meta { grid-template-columns: repeat(3, auto); justify-content: start; gap: var(--space-xl); }
  .faq { grid-template-columns: 360px 1fr; gap: 80px; }
}
</style>
