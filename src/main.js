import { createApp } from 'vue'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
