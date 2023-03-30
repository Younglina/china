<script setup>
import { ref, watch, computed } from 'vue'
import { initData, tabs } from '@/utils/useData.js'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
initData()
const route = useRoute()
const router = useRouter()
const active = ref('');
let title = ref("");
let hasBack = ref(false)
const store = useStore()
const cmptabs = computed(()=>{
  const temTabs = [...tabs]
  if(store.userInfo && store.userInfo.permission.includes(import.meta.env.VITE_VRF))
    temTabs.push({ name: 'Verify', path: '/verify', label: '审核', icon: 'user-o' })
  return temTabs
})
watch(route, (val) => {
  hasBack = !!history.state.back
  title.value = val.meta.title
  active.value = val.name
  if (!cmptabs.value.some(t => t.name === val.name)) {
    active.value = ''
  }
}, {immediate: true})


const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <van-sticky>
    <van-nav-bar
      :title="title"
      left-text=""
      :left-arrow="hasBack"
      @click-left="onClickLeft"
    />
</van-sticky>
  <main class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Home']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="item in cmptabs" :key="item.name" :name="item.name" :to="item.path" :icon="item.icon">
      {{ item.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.app-main {
  padding-bottom: var(--van-tabbar-height);
}
</style>
