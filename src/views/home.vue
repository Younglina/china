<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()
const toHome = () => {
  router.push('/page')
}

</script>

<template>
  <div>
    home
    <div p-5 text-red i-mdi-food-takeout-box>123</div>
    <button @click="toHome">asdf</button>
  </div>
</template>