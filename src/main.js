import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './utils/flexible.js'
import { createPinia } from 'pinia'
import './style.css';
import { initData } from '@/utils/useData.js'
// import VConsole from 'vconsole'
// new VConsole()
const app = createApp(App)
await initData()

app.use(router)
app.use(createPinia())
app.mount('#app')
