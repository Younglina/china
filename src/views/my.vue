<script setup>
import sign from './sign.vue'
import { ref, computed } from 'vue'
import { useStore } from '@/store'
const store = useStore()
let userInfo = computed(()=>store.userInfo)
</script>
<template>
  <div v-if="userInfo">
    用户名：{{ userInfo.username }}
  </div>
  <sign v-else></sign>
</template>
<style scoped lang='scss'>

</style>