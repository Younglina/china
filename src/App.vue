<script setup>
import { ref, watch } from 'vue'
import { initData, tabs } from '@/utils/useData.js'
import { useRoute } from 'vue-router'
initData()
const route = useRoute()
const active = ref('');
watch(route, (val) => {
  active.value = val.name
  if (!tabs.some(t => t.name === val.name)) {
    active.value = ''
  }
})
</script>

<template>
  <main class="app-main">
    <router-view></router-view>
  </main>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="item in tabs" :key="item.name" :name="item.name" :to="item.path" :icon="item.icon">
      {{ item.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.app-main {
  padding-bottom: var(--van-tabbar-height);
}
</style>
