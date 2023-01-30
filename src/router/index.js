import { createRouter, createWebHashHistory } from 'vue-router'
const Home = import('@/views/home.vue')
const Page = import('@/views/page.vue')
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/page', name: 'Page', component: Page },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
