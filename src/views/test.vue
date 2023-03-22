<script setup>
import { ref } from "vue";
import { useStore } from '@/store'
const visible = ref(true);
const store = useStore()
const show = () => {
  console.log(store.allImages)
};
</script>
<template>
  <button @click="show">show</button>
</template>
<style>
</style>
