# Adam Lukac Photo – web

Web reportážneho fotografa. **Vue 3 + Vite**, bez ťažkých knižníc. Dizajn vychádza z Figma súboru (stránky `=== WEB ===`), farby, medzery a písmo sú v `src/styles/tokens.css` a zodpovedajú premenným vo Figme.

## Spustenie

```bash
npm install
npm run dev      # vývoj na http://localhost:5173
npm run build    # produkčný build do dist/
npm run preview  # náhľad buildu
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

## Publikovanie na GitHub Pages

1. Vytvor repozitár na GitHube a nahraj doň tento projekt (vetva `main`).
2. V repozitári: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Každý push do `main` web automaticky zostaví a zverejní (`.github/workflows/deploy.yml`). Adresa bude `https://<používateľ>.github.io/<repozitár>/`.

**Vlastná doména neskôr:** pridaj súbor `public/CNAME` s doménou, v `deploy.yml` nastav `BASE_PATH: /` a doménu nastav v Settings → Pages.

## Kontaktný formulár

GitHub Pages nevie spracovať formulár na serveri, preto:

- **S externou službou (odporúčané):** založ formulár napr. na Formspree, Basin alebo Getform a jeho URL ulož v GitHube ako premennú repozitára `VITE_FORM_ENDPOINT` (Settings → Secrets and variables → Actions → Variables). Správy budú chodiť na e-mail.
- **Bez služby:** stačí vyplniť `email` v `src/data/site.js` – formulár potom otvorí e-mailového klienta s predvyplnenou správou.

Formulár má skryté pole proti spamovým robotom.
