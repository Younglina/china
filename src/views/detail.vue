<script setup>
import { scenicArea } from '@/utils/useData.js'
import { guide } from '@/utils/useMap.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

let detailData = ref({})
onMounted(() => {
  const queryName = route.query.name
  const curData = scenicArea.find(item => item.name === queryName)
  detailData = curData || {}
})
</script>

<template>
  <main>
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.images" :key="item.name">
        <img class="home-swipe__image" :src="item" />
      </van-swipe-item>
    </van-swipe>
    <h3>{{ address }}</h3>
    <p>{{ detailData.intorduction }}</p>
    <div>
      <button @click="guide('gd', detailData)">123123</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
:deep.home-swipe {
  &__image {
    object-position: center center;
    object-fit: cover;
    height: 6rem;
    width: 100%;
  }

  .van-swipe__track {
    align-items: center
  }
}
</style>