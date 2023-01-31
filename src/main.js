import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './utils/flexible.js'
import { createPinia } from 'pinia'
// 导入Unocss
import 'uno.css'
import vconsole from 'vconsole'
new vconsole()
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
