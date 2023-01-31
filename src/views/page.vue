<script setup>
import { useRouter } from 'vue-router'
import { getStore } from '@/store'
const router = useRouter()
const store = getStore()
const toHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <div>{{ store.counter }}</div>
    <button @click="toHome">asdf</button>
  </div>
</template>