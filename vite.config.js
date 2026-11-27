import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// BASE_PATH nastavuje GitHub Actions podľa názvu repozitára (napr. /adamlukacphoto/).
// Pri vlastnej doméne stačí base '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  // Pri vývoji (npm run dev) posiela formulár na lokálny server (npm run dev:api).
  server: { proxy: { '/api': 'http://127.0.0.1:3000' } },
})
