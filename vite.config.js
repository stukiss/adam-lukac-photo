import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// BASE_PATH nastavuje GitHub Actions podľa názvu repozitára (napr. /adamlukacphoto/).
// Pri vlastnej doméne stačí base '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
})
