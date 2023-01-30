import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入Unocss
import 'uno.css'
createApp(App).use(router).mount('#app')
