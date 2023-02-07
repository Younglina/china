import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './utils/flexible.js'
import { createPinia } from 'pinia'
import './style.css';
import { initAllImage } from '@/utils/useData.js'
import VConsole from 'vconsole'
initAllImage()
new VConsole()
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
