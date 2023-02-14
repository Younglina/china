import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { Lazyload } from 'vant';
import './utils/flexible.js'
import { createPinia } from 'pinia'
import './style.css';
import { initData } from '@/utils/useData.js'
const app = createApp(App)
initData()

app.use(router)
app.use(Lazyload)
app.use(createPinia())
app.mount('#app')
