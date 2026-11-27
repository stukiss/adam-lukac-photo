// Kontaktné údaje a nastavenia webu. TODO: doplniť skutočné hodnoty.
export const site = {
  email: '', // napr. 'adam@adamlukacphoto.sk' – kým je prázdne, zobrazí sa „doplniť“
  phone: '', // voliteľné
  instagram: { handle: '', url: '' }, // napr. { handle: '@adamlukacphoto', url: 'https://instagram.com/adamlukacphoto' }

  // Fotka na stránke „O mne“ (súbor v public/photos bez prípony veľkosti), napr. 'adam'.
  // Kým je null, zobrazí sa decentný zástupný blok s monogramom.
  aboutPhoto: null,

  // Odosielanie formulára: URL služby typu Formspree / Basin / Getform (POST JSON).
  // Nastavuje sa cez premennú VITE_FORM_ENDPOINT. Bez nej formulár otvorí e-mailového klienta.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
}
