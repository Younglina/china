import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/page', name: 'Page', component: () => import('@/views/page.vue') },
  { path: '/preview', name: 'Preview', component: () => import('@/views/previewList.vue') },
  { path: '/detail', name: 'Detail', component: () => import('@/views/detail.vue') },
  { path: '/addArea', name: 'AddArea', component: () => import('@/views/addArea.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
