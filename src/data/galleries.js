// Fotky a galérie. Fotky ležia v public/photos/<názov>-800.jpg a <názov>-1600.jpg.
// Novú galériu pridáš novým objektom v zozname `galleries` (poradie = poradie na webe).

/** Popisy fotiek (alt texty) – dôležité pre prístupnosť a SEO. `portrait: true` = fotka na výšku. */
export const photos = {
  'svadba-01': { alt: { sk: 'Slávnostný stôl so sviečkami a gypsomilkou' } },
  'svadba-02': { alt: { sk: 'Svadobná výslužka – fľaštička v tvare srdca' } },
  'svadba-03': { alt: { sk: 'Ženích čaká na nevestu pri obrade' }, portrait: true },
  'svadba-04': { alt: { sk: 'Usmiata nevesta s kyticou počas gratulácií' }, portrait: true },
  'svadba-05': { alt: { sk: 'Gratulácie po obrade' } },
  'svadba-06': { alt: { sk: 'Nevesta a ženích v záhrade' } },
  'svadba-07': { alt: { sk: 'Bozk novomanželov' } },
  'svadba-08': { alt: { sk: 'Bozk pri svadobnej hostine' } },
  'svadba-09': { alt: { sk: 'Prvý tanec novomanželov' } },
  'svadba-10': { alt: { sk: 'Novomanželia medzi hosťami s prskavkami' } },
  'stuzkova-01': { alt: { sk: 'Zelené stužky pripravené na stužkovanie' } },
  'stuzkova-02': { alt: { sk: 'Dve maturantky pri fotostene z balónov' }, portrait: true },
  'stuzkova-03': { alt: { sk: 'Dojatá mama počas slávnostného programu' }, portrait: true },
  'stuzkova-04': { alt: { sk: 'Stužkovanie maturantky' }, portrait: true },
  'stuzkova-05': { alt: { sk: 'Tanec maturanta s mamou' }, portrait: true },
  'stuzkova-06': { alt: { sk: 'Zábava na parkete pod fialovými svetlami' } },
  'stuzkova-07': { alt: { sk: 'Maturant tancuje pod modrými reflektormi' } },
  'stuzkova-08': { alt: { sk: 'Zapaľovanie sviečky počas programu' } },
  'stuzkova-09': { alt: { sk: 'Maturanti v slnečných okuliaroch počas scénky' } },
  'stuzkova-10': { alt: { sk: 'Plný parket počas zábavy' } },
}

export const categories = ['svadby', 'stuzkove', 'studentske']

/** Titulná fotka každej kategórie (karty na úvodnej stránke). */
export const categoryCovers = {
  svadby: 'svadba-09',
  stuzkove: 'stuzkova-05',
  studentske: 'stuzkova-07', // TODO: nahradiť fotkou zo študentskej akcie
}

/** Fotka v úvode domovskej stránky. */
export const heroPhoto = 'svadba-04'

export const galleries = [
  {
    slug: 'nika-patrik', // TODO: overiť názov a súhlas páru so zverejnením
    category: 'svadby',
    year: 2025,
    title: { sk: 'Nika & Patrik' },
    place: { sk: '' }, // TODO
    story: {
      sk: 'Krátky príbeh dňa – pár viet, ktoré uvedú galériu: kde sa svadba konala, aká bola atmosféra a čo si z nej pamätáte. (doplniť)',
    },
    cover: 'svadba-07',
    featured: ['svadba-04', 'svadba-09', 'svadba-10', 'svadba-07'],
    photos: ['svadba-10', 'svadba-01', 'svadba-02', 'svadba-03', 'svadba-04', 'svadba-05', 'svadba-06', 'svadba-07', 'svadba-08', 'svadba-09'],
  },
  {
    slug: 'stuzkova-2025', // TODO: doplniť triedu a školu (napr. stuzkova-4e-gvbn)
    category: 'stuzkove',
    year: 2025,
    title: { sk: 'Stužková 2025' },
    place: { sk: '' },
    story: {
      sk: 'Slávnostný program, stužkovanie a zábava až do rána. (doplniť)',
    },
    cover: 'stuzkova-05',
    featured: ['stuzkova-05', 'stuzkova-03', 'stuzkova-07', 'stuzkova-02'],
    photos: ['stuzkova-01', 'stuzkova-02', 'stuzkova-03', 'stuzkova-04', 'stuzkova-08', 'stuzkova-05', 'stuzkova-09', 'stuzkova-06', 'stuzkova-07', 'stuzkova-10'],
  },
]

export const findGallery = (slug) => galleries.find((g) => g.slug === slug)
