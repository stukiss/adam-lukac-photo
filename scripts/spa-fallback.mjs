// GitHub Pages nepozná routovanie SPA – pri priamom otvorení /sk/ponuka vráti 404.html.
// Kópia index.html ako 404.html zabezpečí, že sa načíta aplikácia a router zobrazí správnu stránku.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
console.log('✓ dist/404.html (SPA fallback)')
