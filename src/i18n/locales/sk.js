// Všetky texty webu v slovenčine. Upravuj pokojne priamo tu – štruktúru (kľúče) nechaj rovnakú.
// Pre ďalší jazyk skopíruj tento súbor (napr. cs.js) a prelož hodnoty vrátane `routes`.
export default {
  langName: 'Slovenčina',

  // Časti adries pre jednotlivé stránky (/sk/o-mne, /sk/ponuka, …)
  routes: {
    home: '',
    portfolio: 'portfolio',
    about: 'o-mne',
    offer: 'ponuka',
    contact: 'kontakt',
  },

  meta: {
    siteName: 'Adam Lukac Photo',
    titles: {
      home: 'Adam Lukac Photo · reportážna fotografia',
      portfolio: 'Portfólio',
      gallery: 'Galéria',
      about: 'O mne',
      offer: 'Ponuka a ceny',
      contact: 'Kontakt',
      notFound: 'Stránka sa nenašla',
    },
    description:
      'Reportážna fotografia svadieb, stužkových a študentských akcií. Prirodzené momenty bez pózovania – Prievidza, Žilina a celé Slovensko.',
  },

  nav: {
    portfolio: 'Portfólio',
    about: 'O mne',
    offer: 'Ponuka',
    contact: 'Kontakt',
    cta: 'Napíš mi',
    openMenu: 'Otvoriť menu',
    closeMenu: 'Zavrieť menu',
    skip: 'Preskočiť na obsah',
    home: 'Úvod',
  },

  categories: {
    svadby: { name: 'Svadby', label: 'Svadba', text: 'Obrad, emócie, tanec a detaily celého dňa.' },
    stuzkove: { name: 'Stužkové', label: 'Stužková', text: 'Ceremoniál, zábava a atmosféra večera.' },
    studentske: { name: 'Študentské akcie', label: 'Študentská akcia', text: 'Šport, koncerty a podujatia z univerzitného prostredia.' },
  },

  common: {
    writeMe: 'Napíš mi',
    seePortfolio: 'Pozri portfólio',
    seeOffer: 'Pozri ponuku',
    seeGallery: 'Pozri galériu',
    moreAboutMe: 'Viac o mne',
    wholePortfolio: 'Celé portfólio',
    requestQuote: 'Chcem ponuku',
    photoSoon: 'Fotka čoskoro',
  },

  cta: {
    title: 'Máte termín?',
    text: 'Napíšte mi dátum a miesto, ozvem sa do 48 hodín.',
  },

  footer: {
    tagline: 'reportážna fotografia',
    region: 'Prievidza · Žilina · celé Slovensko',
  },

  home: {
    eyebrow: 'Reportážna fotografia',
    title: 'Vy si užívate, ja zachytávam spomienky.',
    lead: 'Svadby, stužkové a študentské akcie. Prirodzené momenty bez pózovania, zachytené nenápadne.',
    heroAlt: 'Usmiata nevesta s kyticou počas gratulácií',
    categoriesTitle: 'Čo fotím',
    stepsTitle: 'Ako to prebieha',
    steps: [
      { title: 'Napíšete mi', text: 'Dátum, miesto a typ akcie. Ozvem sa do 48 hodín.' },
      { title: 'Pripravím ponuku', text: 'Podľa rozsahu akcie dostanete cenovú ponuku na mieru.' },
      { title: 'Vy si užívate', text: 'Som v úzadí a zachytávam momenty, ktoré by inak prešli bez povšimnutia.' },
      { title: 'Dostanete galériu', text: 'Upravené fotky v online galérii, pripravené na stiahnutie aj tlač.' },
    ],
    aboutEyebrow: 'O mne',
    aboutTitle: 'Ahoj, som Adam',
    aboutText:
      'Fotím od základnej školy – najprv prírodu a veci, ktoré ma zaujali, neskôr akcie, ktoré ma chytili najviac. Popri fotení robím doktorát v oblasti multimédií a venujem sa hudbe, zvukovej a svetelnej technike.',
    // Referencie – keď nejaké budú, doplň ich sem. Prázdny zoznam = sekcia sa nezobrazí.
    testimonials: [],
    testimonialsEyebrow: 'Referencie',
  },

  portfolio: {
    eyebrow: 'Portfólio',
    title: 'Momenty, ktoré by ste inak nevideli',
    lead: 'Výber z ostatných akcií. Pod ním nájdete celé galérie – celý príbeh dňa od začiatku do konca.',
    filterAll: 'Všetko',
    filterLabel: 'Filtrovať podľa kategórie',
    galleriesTitle: 'Galérie z akcií',
    galleriesText: 'Celé príbehy – od príprav až po posledný tanec.',
    emptyCategory: 'Galérie z tejto kategórie práve pripravujem.',
  },

  gallery: {
    back: 'Späť na portfólio',
    place: 'Miesto',
    photosCount: '{count} fotiek',
    prev: 'Predchádzajúca',
    next: 'Ďalšia',
    ctaTitle: 'Páči sa vám, ako fotím?',
    ctaText: 'Napíšte mi o vašej akcii – dátum, miesto a pár slov o tom, čo plánujete.',
    notFound: 'Táto galéria neexistuje.',
    lightboxClose: 'Zavrieť',
    lightboxPrev: 'Predchádzajúca fotka',
    lightboxNext: 'Ďalšia fotka',
  },

  about: {
    eyebrow: 'O mne',
    title: 'Ahoj, som Adam',
    lead: 'Fotím od základnej školy. Začínal som prírodou a vecami, ktoré ma zaujali – a postupne som sa dostal k foteniu akcií, ktoré ma chytilo najviac.',
    text: 'Na svadbách, stužkových či koncertoch ma baví sledovať, ako sa večer vyvíja, a zachytiť momenty, ktoré by inak prešli bez povšimnutia. Preto fotím nenápadne – aby ste si deň užili vy, nie fotoaparát.',
    howTitle: 'Ako fotím',
    how: [
      { title: 'Nenápadne', text: 'Som v úzadí a nechávam udalosti plynúť. Ľudia si ma po chvíli prestanú všímať – a vtedy vznikajú najprirodzenejšie fotky.' },
      { title: 'S bleskom aj bez', text: 'Podľa situácie: denné svetlo, tmavá sála aj parket pod reflektormi. Od širokých záberov až po detaily z diaľky.' },
      { title: 'Kým sa zabávate', text: 'Na akcii zostávam podľa dohody. A keď je atmosféra dobrá a ľudia sa bavia, rád ostanem aj dlhšie.' },
    ],
    offEyebrow: 'Mimo fotenia',
    offTitle: 'Hudba, zvuk a svetlo',
    offText:
      'Popri fotení robím doktorandské štúdium v oblasti multimédií a venujem sa hudbe, zvukovej a svetelnej technike. Vďaka tomu rozumiem pódiu, svetlu aj tomu, kedy príde ten správny moment.',
    techEyebrow: 'Technika',
    techText:
      'Fotím na Nikon s objektívmi rôznych značiek – od širokouhlých až po veľké zoomy, takže zvládnem preplnený parket aj detail z druhého konca sály.',
    ctaTitle: 'Poďme sa spoznať',
    ctaText: 'Napíšte mi pár slov o vašej akcii – rád sa ozvem a dohodneme detaily.',
  },

  offer: {
    eyebrow: 'Ponuka',
    title: 'Cena podľa vašej akcie',
    lead: 'Každá akcia je iná, preto ponuku pripravujem na mieru. Ceny nižšie sú orientačné – presnú sumu dostanete v cenovej ponuke.',
    priceNote: 'orientačná cena',
    // TODO: doplniť ceny a lehoty
    packages: [
      { category: 'svadby', price: 'od XXX €', items: ['Obrad a skupinové fotky', 'Prípravy, hostina a večer podľa dohody', 'Online galéria upravených fotiek', 'Dodanie do X týždňov'] },
      { category: 'stuzkove', price: 'od XXX €', items: ['Slávnostný program a stužkovanie', 'Zábava, tanec a fotostena', 'Výber pre web + celá galéria pre triedu', 'Dodanie do X týždňov'] },
      { category: 'studentske', price: 'od XX € / hod.', items: ['Šport, koncerty a podujatia', 'Hodinová sadzba alebo balík', 'Rýchly výber pre sociálne siete', 'Použitie fotiek pre organizátora'] },
    ],
    quote: {
      eyebrow: 'Vzor',
      title: 'Takto vyzerá cenová ponuka',
      text: 'Po vyplnení formulára vám pošlem ponuku na mieru – s jasným rozpisom, čo je v cene.',
      from: 'reportážna fotografia · kontakt a fakturačné údaje doplniť',
      number: 'Cenová ponuka č. 2026-001',
      issued: 'Vystavená 27. 11. 2026 · platí 30 dní',
      meta: [
        { label: 'Pre', value: 'Trieda 4.E (vzor)' },
        { label: 'Akcia', value: 'Stužková · 14. 2. 2027 · Prievidza' },
        { label: 'Rozsah', value: 'cca 6 hodín' },
      ],
      head: { item: 'Položka', qty: 'Rozsah', price: 'Cena' },
      rows: [
        { item: 'Fotografovanie stužkovej (program + zábava)', qty: '6 h', price: 'XXX €' },
        { item: 'Výber a úprava fotiek (cca 300 ks)', qty: '—', price: 'v cene' },
        { item: 'Online galéria na 6 mesiacov', qty: '—', price: 'v cene' },
        { item: 'Fotostena / foto kútik (voliteľné)', qty: '—', price: 'XX €' },
        { item: 'Doprava Prievidza → miesto akcie', qty: 'XX km', price: 'XX €' },
      ],
      total: 'Spolu',
      totalValue: 'XXX €',
      notes: [
        'Záloha XX % pri rezervácii termínu, doplatok po akcii.',
        'Upravené fotky do X týždňov, rýchly výber do X dní.',
        'Fakturačné údaje a informácia o DPH – doplniť.',
      ],
    },
    faqTitle: 'Časté otázky',
    faq: [
      { q: 'Koľko fotiek dostaneme?', a: 'Záleží od dĺžky a typu akcie. Vyberám tie najlepšie zábery, nie všetky – presný odhad nájdete v ponuke.' },
      { q: 'Ako dlho trvá dodanie?', a: 'Spravidla do X týždňov. Krátku ukážku pošlem skôr, aby ste mali čo zdieľať hneď po akcii.' },
      { q: 'Cestujete aj mimo Prievidze a Žiliny?', a: 'Áno, po celom Slovensku aj na Morave. Dopravu rátam podľa vzdialenosti.' },
      { q: 'Ako si rezervujeme termín?', a: 'Po odsúhlasení ponuky a zaplatení zálohy je termín váš.' },
    ],
    ctaTitle: 'Chcete presnú ponuku?',
    ctaText: 'Napíšte mi dátum, miesto a typ akcie – ponuku pošlem do 48 hodín.',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Napíšte mi',
    lead: 'Pošlite mi pár detailov o vašej akcii. Ozvem sa do 48 hodín a pripravím vám cenovú ponuku na mieru.',
    info: { email: 'E-mail', instagram: 'Instagram', phone: 'Telefón', region: 'Kde fotím' },
    regionValue: 'Prievidza, Žilina, celé Slovensko a Morava',
    formTitle: 'Dopyt',
    fields: {
      name: { label: 'Meno', placeholder: 'Vaše meno' },
      email: { label: 'E-mail', placeholder: 'vas@email.sk' },
      phone: { label: 'Telefón (nepovinné)', placeholder: '+421 …' },
      type: { label: 'Typ akcie', placeholder: 'Vyberte…' },
      date: { label: 'Dátum akcie', placeholder: '' },
      place: { label: 'Miesto', placeholder: 'Mesto, sála' },
      message: { label: 'Správa', placeholder: 'Napíšte mi viac o akcii – rozsah, počet hostí, čo je pre vás dôležité…' },
    },
    typeOther: 'Iné',
    consent: 'Odoslaním súhlasíte so spracovaním osobných údajov na účel odpovede na váš dopyt.',
    submit: 'Odoslať dopyt',
    sending: 'Odosielam…',
    success: 'Ďakujem, správa odišla. Ozvem sa do 48 hodín.',
    error: 'Správu sa nepodarilo odoslať. Skúste to prosím znova alebo mi napíšte priamo na e-mail.',
    required: 'Vyplňte prosím toto pole.',
    invalidEmail: 'Skontrolujte prosím e-mailovú adresu.',
    tooLong: 'Text je príliš dlhý, skráťte ho prosím.',
    invalid: 'Skontrolujte prosím túto hodnotu.',
  },

  notFound: {
    title: 'Táto stránka sa nenašla',
    text: 'Možno bola presunutá alebo adresa obsahuje preklep.',
    back: 'Späť na úvod',
  },
}
