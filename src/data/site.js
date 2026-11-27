// Kontaktné údaje a nastavenia webu.
export const site = {
  email: 'adamlukacphoto@gmail.com',
  phone: '+421 917 713 179', // voliteľné
  instagram: { handle: '@adam__lukac', url: 'https://www.instagram.com/adam__lukac/' },

  // Fotka na stránke „O mne“ (súbor v public/photos bez prípony veľkosti), napr. 'adam'.
  // Kým je null, zobrazí sa decentný zástupný blok s monogramom.
  aboutPhoto: null,

  // Odosielanie formulára: URL služby typu Formspree / Basin / Getform (POST JSON).
  // Nastavuje sa cez premennú VITE_FORM_ENDPOINT. Bez nej formulár otvorí e-mailového klienta.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
}
