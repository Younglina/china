import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,' } },
  { path: '/page', name: 'Page', component: () => import('@/views/page.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,' } },
  { path: '/preview', name: 'Preview', component: () => import('@/views/previewList.vue') , meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,' }},
  { path: '/detail', name: 'Detail', component: () => import('@/views/detail.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,' } },
  { path: '/addArea', name: 'AddArea', component: () => import('@/views/addArea.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
