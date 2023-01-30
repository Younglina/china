<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()
const toHome = () => {
  router.push('/page')
}

</script>

<template>
  <div>
    <div>home</div>
    <div text-red i-mdi-food-takeout-box></div>
    <button @click="toHome">asdf</button>
  </div>
</template>