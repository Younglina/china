<script setup>
import { ref } from "vue";
const visible = ref(true);
const show = () => {
  visible.value = !visible.value;
};
</script>
<template>
  <button @click="show">show</button>
  <transition>
    <div v-show="visible" class="message">asdf</div>
  </transition>
</template>
<style>
.message {
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 2000;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background-color: #666;
  padding: 2px 12px;
  border-radius: 6px;
  transition: opacity 0.3s, transform 0.3s, top 0.3s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
