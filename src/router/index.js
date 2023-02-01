import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/page', name: 'Page', component: () => import('@/views/page.vue') },
  { path: '/preview', name: 'Preview', component: () => import('@/views/previewList.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
