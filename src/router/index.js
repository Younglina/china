import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '首页' } },
  { path: '/page', name: 'Page', component: () => import('@/views/page.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '留言' } },
  { path: '/preview', name: 'Preview', component: () => import('@/views/previewList.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '列表预览' } },
  { path: '/detail', name: 'Detail', component: () => import('@/views/detail.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '详情' } },
  { path: '/addArea', name: 'AddArea', component: () => import('@/views/addArea.vue'), meta: { keywords: '景德镇,景德镇陶瓷博物馆,陶溪川,御窑厂,景德镇旅游,景德镇美食,', title: '新增' } },
  { path: '/my', name: 'My', component: () => import('@/views/my.vue') , meta: { title: '我的'}},
  // { path: '/test', name: 'test', component: () => import('@/views/test.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
