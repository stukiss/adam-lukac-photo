# Adam Lukac Photo – web

Web reportážneho fotografa. **Vue 3 + Vite**, bez ťažkých knižníc. Dizajn vychádza z Figma súboru (stránky `=== WEB ===`), farby, medzery a písmo sú v `src/styles/tokens.css` a zodpovedajú premenným vo Figme.

## Spustenie

```bash
npm install
npm run dev      # vývoj na http://localhost:5173
npm run dev:api  # server pre formulár (v druhom termináli), e-maily ukladá do server/outbox/
npm run build    # produkčný build do dist/
npm start        # produkčný server: dist/ + /api/contact na http://127.0.0.1:3000
```

## Kde čo upraviť

| Čo | Kde |
|---|---|
| **Všetky texty** (nadpisy, popisy, ceny, FAQ, formulár) | `src/i18n/locales/sk.js` |
| Kontakt (e-mail, Instagram, telefón), fotka „O mne“ | `src/data/site.js` |
| Galérie, fotky, alt texty, titulné fotky kategórií | `src/data/galleries.js` |
| Farby, písmo, medzery | `src/styles/tokens.css` |

Hľadaj `TODO` a `doplniť` – to sú miesta, ktoré treba ešte vyplniť (ceny, lehoty, kontakty, príbehy galérií).

### Pridanie fotiek a galérie

1. Fotku exportuj v dvoch veľkostiach (dlhšia strana 800 px a 1600 px, JPG ~80 %) a ulož do `public/photos/` ako `nazov-800.jpg` a `nazov-1600.jpg`.
2. V `src/data/galleries.js` doplň do `photos` jej popis (`alt`) a pri fotke na výšku `portrait: true`.
3. Do zoznamu `galleries` pridaj objekt s `slug` (časť adresy), `category`, `year`, `title`, `story`, `cover`, `featured` (fotky do výberu v portfóliu) a `photos` (celá galéria, prvá fotka je veľká úvodná).

### Ďalší jazyk

Skopíruj `src/i18n/locales/sk.js` napr. na `cs.js` a prelož hodnoty (aj `routes` – časti adries). Router automaticky vytvorí adresy `/cs/...`. Lokalizované polia v dátach majú tvar `{ sk: '…', cs: '…' }`. Prepínač jazykov do hlavičky doplníme, keď bude druhý jazyk.

## Server a kontaktný formulár

Web beží na vlastnom Node.js serveri (`server/index.mjs`, bez frameworku). Server servíruje hotový build z `dist/` (aj podstránky typu `/sk/ponuka`) a prijíma dopyty z formulára na `POST /api/contact`.

- **Kontrola na serveri:** povinné polia, dĺžky polí, skryté pole proti robotom a najviac 5 dopytov za 10 minút z jednej IP.
- **E-mail:** chodí na `MAIL_TO` cez SMTP schránku. Predmet má tvar `Nový dopyt – Svadba · 14. 6. 2027 · Jana Nováková`, telo obsahuje polia v pevnom poradí a e-mail má textovú aj HTML verziu. „Odpovedať“ odpíše priamo klientovi.
- **Úprava tvaru e-mailu:** `server/contact.mjs`.
- **Konfigurácia:** `.env` podľa `.env.example`. Súbor `.env` sa necommituje.
- **Vývoj bez SMTP:** e-maily sa neposielajú, ukladajú sa ako `.eml` do `server/outbox/`.

## Nasadenie na VPS

Potrebuješ Node.js 22+, nginx a doménu nasmerovanú na server.

```bash
git clone https://github.com/stukiss/adam-lukac-photo.git && cd adam-lukac-photo
npm ci && npm run build
cp .env.example .env   # doplň SMTP, NODE_ENV=production, TRUST_PROXY=true
npm start              # na skúšku; natrvalo cez systemd (deploy/adamlukacphoto.service)
```

nginx preposiela požiadavky na `127.0.0.1:3000` (pozri `deploy/nginx.conf`). HTTPS zabezpečí certbot (`certbot --nginx`).

**Aktualizácia webu:** `git pull && npm ci && npm run build && sudo systemctl restart adamlukacphoto`

**Dočasný náhľad na GitHub Pages:** pri pushi do `main` sa web stále zverejní aj na GitHub Pages (`.github/workflows/deploy.yml`). Pages nemajú server, preto tam formulár neodošle správu a ukáže chybu. Po presune na VPS workflow zrušíme.
