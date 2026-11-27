# CLAUDE.md – Adam Lukac Photo (web)

Komunikuj s Adamom **po slovensky**. Commit správy píš po slovensky.

## O projekte a značke
- Adam Lukac, reportážny fotograf: svadby, stužkové, študentské akcie, koncerty. Fotí nenápadne, v úzadí, prirodzené momenty bez pózovania.
- Región: Prievidza, Žilina, celé Slovensko, aj Morava.
- Sľub značky: **„Vy si užívate, ja zachytávam spomienky.“**
- Tón textov: pokojný, nenápadný, mierne neformálny. Klientov oslovujeme v množnom čísle („vy“ – pár, trieda). Tlačidlá (CTA) sú „Napíš mi“; súvislé texty vykajú („Napíšte mi…“).
- Okrem fotenia: doktorandské štúdium v oblasti multimédií, hudba, zvuková a svetelná technika. Technika Nikon, objektívy rôznych značiek (od širokouhlých po veľké zoomy), s bleskom aj bez.

## Technika
- **Vue 3 + Vite + vue-router**, žiadne ďalšie ťažké knižnice. Písmo **Jost** cez `@fontsource/jost`.
- Príkazy: `npm install`, `npm run dev` (Vite, `/api` proxy na :3000), `npm run dev:api` (server formulára, bez SMTP ukladá e-maily do `server/outbox/`), `npm run build` (vite build + kópia `index.html` → `404.html` pre GitHub Pages), `npm start` (produkčný server).
- **i18n** – vlastná ľahká lokalizácia v `src/i18n/index.js` (bez vue-i18n). Texty v `src/i18n/locales/sk.js`. Nový jazyk = nový súbor v `locales/` (načíta sa cez `import.meta.glob`), router mu automaticky vygeneruje trasy. `useI18n()` vracia `t(path, vars)`, `c` (celý obsah jazyka), `loc(field)` pre polia `{ sk: '…' }` v dátach.
- **Router** (`src/router.js`): trasy pre každý jazyk z `messages[locale].routes` – `/sk`, `/sk/portfolio`, `/sk/o-mne`, `/sk/ponuka`, `/sk/kontakt`, `/sk/portfolio/:slug`, 404 na `/sk/*`. `/` presmeruje na `/sk`. Titulky stránok nastavuje `afterEach` (galéria si ho nastaví sama). Odkazy cez `src/composables/useLocalePath.js`.
- **Dáta**:
  - `src/data/site.js` – e-mail, telefón, Instagram, `aboutPhoto`, `formEndpoint` (z `VITE_FORM_ENDPOINT`).
  - `src/data/galleries.js` – `photos` (alt texty, `portrait: true`), `categories` (`svadby` / `stuzkove` / `studentske`), `categoryCovers`, `heroPhoto`, `galleries` (slug, category, year, title, place, story, cover, featured, photos – prvá je veľká úvodná).
- **Fotky**: `public/photos/<názov>-800.jpg` a `<názov>-1600.jpg` (dlhšia strana, JPG ~80 %). Komponent `AppPhoto.vue` skladá srcset.
- **Komponenty** v `src/components/` (AppHeader, AppFooter, BaseButton, CtaBlock, PageIntro, CategoryCard, GalleryCard, PhotoMasonry, PhotoLightbox, AppPhoto, AboutPhoto), **stránky** v `src/pages/`.
- **Server** (`server/index.mjs`, len `node:http` + `nodemailer`): servíruje `dist/` so SPA fallbackom a `POST /api/contact`. Kontrola polí, honeypot `website`, limit 5 dopytov / 10 min / IP. Tvar e-mailu v `server/contact.mjs` (predmet `Nový dopyt – {typ} · {dátum} · {meno}`, reply-to = klient). Konfigurácia cez `.env` (`.env.example`), SMTP schránka. Nasadenie na VPS: `deploy/` (systemd + nginx), postup v README.
- **Formulár** (`ContactPage.vue`): POST JSON na `site.formEndpoint` (predvolene `BASE_URL + api/contact`, prepísateľné `VITE_FORM_ENDPOINT`). Chyby polí zo servera zobrazí pri poliach.
- **Hosting**: cieľ je **VPS s Node.js** (nginx → `127.0.0.1:3000`), base `/`. Dočasne beží náhľad na GitHub Pages (`.github/workflows/deploy.yml`, push do `main`, `BASE_PATH = /adam-lukac-photo/`) – tam formulár nefunguje; workflow zrušiť po presune na VPS.
- Repozitár: `stukiss/adam-lukac-photo`.

## Dizajn (zdroj pravdy je Figma)
- Figma file key **`xLML4hNeId2zgALkbrYfgF`**. Stránky „Finálny smer“, „Komponenty“ a za „=== WEB ===“ návrhy: Domov, Portfólio, Galéria (detail), O mne, Ponuka, Kontakt – desktop 1440 + mobil 390.
- Zvolený smer: čisté rozloženie (A) + zaoblené tlačidlá a centrovaný CTA blok (B) + hlavička (C): monogram AL v rámčeku + wordmark „Adam Lukac Photo“, menu v strede s aktívnou položkou ako krémová „pilulka“, tlačidlo „Napíš mi“ vpravo.
- **Tokeny** v `src/styles/tokens.css` (zhodné s premennými vo Figme). V CSS **vždy používaj tokeny**, nikdy pevné farby či medzery:
  - pozadie `#FAF7EC`, jemné pozadie `#F1ECDA`, čiary `#E6E0CC`
  - hlavná zelená `#123B16`, hover `#2C5E31`, sekundárny text `#5E7A60`, text `#1E2A1F`
  - mosadz `#A8895A` len na dekor (linky, šípky), na text `#7A6238`
  - zaoblenia 0 / 2 / 4 / 999 px; medzery 4 / 8 / 16 / 24 / 40 / 64 / 96
- Fotky majú teplý matný „filmový“ vzhľad; svadby svetlé a vzdušné, stužkové tmavšie a náladové. Web má fotky nechať vyniknúť, nič neprekrikovať.

## Stav
- Hotové: všetky stránky, responzivita, filter portfólia, lightbox, formulár s kontrolou polí, 404, kontakty, server pre formulár.
- **TODO** (v kóde `TODO` / „doplniť“ / `XXX`):
  - ceny, lehoty, záloha, fakturačné údaje (`sk.js` → `offer`)
  - Adamova fotka na „O mne“ (`site.aboutPhoto`)
  - galérie „Nika & Patrik“ a „Stužková 2025“ – názvy, súhlasy, miesto, príbehy (zatiaľ zástupné)
  - fotky zo študentských akcií (`categoryCovers.studentske` zatiaľ zo stužkovej)
  - referencie (`sk.js` → `home.testimonials`, prázdny zoznam = sekcia sa skryje)
  - VPS: výber hostingu, doména, SMTP schránka, nasadenie (`deploy/`), zrušenie GitHub Pages
- Adam má vybraných 30 fotiek do portfólia (dolaďuje preset) – pridáme ich neskôr s ďalšími galériami.

## Plán
1. ✓ GitHub repozitár + dočasný náhľad na GitHub Pages: https://stukiss.github.io/adam-lukac-photo/
2. Dolaďovať texty a dopĺňať obsah (fotky, galérie, ceny, kontakty).
3. ✓ Formulár cez vlastný server – zostáva nasadenie na VPS so SMTP.
4. Neskôr SEO (meta tagy pre stránky, Open Graph obrázok, sitemap), vlastná doména, prípadne ďalší jazyk s prepínačom.

## Spôsob práce – subagenti a modely
Hlavné sedenie (Opus) plánuje, rozhoduje o architektúre a dizajne a kontroluje výsledok. Ohraničené úlohy deleguje na subagentov v `.claude/agents/`:

| Subagent | Model | Úloha |
|---|---|---|
| `copy-editor` | haiku | Úpravy textov v `src/i18n/locales/*.js` – preklepy, skracovanie, zjednotenie tónu. Mení len hodnoty, nikdy kľúče ani štruktúru. |
| `content-manager` | haiku | Pridávanie fotiek a galérií: export 800/1600 px do `public/photos`, zápis do `src/data/galleries.js`, alt texty po slovensky. |
| `vue-dev` | sonnet | Bežná implementácia: komponenty, úpravy stránok, CSS podľa tokenov, opravy chýb. Žiadne pevne zapísané farby či medzery. |
| `qa-checker` | sonnet | Po zmenách `npm run build`, kontrola konzoly a zobrazenia v 1440 a 390 px, hlásenie chýb. Nič neopravuje. |

Pravidlá:
- **Opus (hlavné sedenie)**: návrh štruktúry, rozhodnutia o dizajne a UX, zmeny v routeri, i18n a builde, publikovanie, SEO stratégia, záverečná kontrola práce subagentov.
- **sonnet**: samostatné úlohy s jasným zadaním. **haiku**: mechanické úlohy (texty, dáta, hromadné premenovania).
- Ak subagent úlohu nezvládne alebo je zložitejšia, vráti ju hlavnému sedeniu – nehádá.
- Subagent vždy dostane presné zadanie: ktoré súbory, čo sa nesmie meniť, ako vyzerá hotová práca.
- Výsledok subagenta pred commitom skontrolovať (diff + build).
- Commitovať po menších logických krokoch so slovenskými správami. **Push a zmeny v nastaveniach GitHubu len po Adamovom súhlase.**
