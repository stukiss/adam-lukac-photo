// Kontaktné údaje a nastavenia webu.
export const site = {
  email: 'adamlukacphoto@gmail.com',
  phone: '+421 917 713 179', // voliteľné
  instagram: { handle: '@adam__lukac', url: 'https://www.instagram.com/adam__lukac/' },

  // Fotka na stránke „O mne“ (súbor v public/photos bez prípony veľkosti), napr. 'adam'.
  // Kým je null, zobrazí sa decentný zástupný blok s monogramom.
  aboutPhoto: null,

  // Odosielanie formulára: POST JSON na vlastný server (server/index.mjs → /api/contact).
  // VITE_FORM_ENDPOINT môže adresu prepísať (napr. API na inej doméne).
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || `${import.meta.env.BASE_URL}api/contact`,
}
