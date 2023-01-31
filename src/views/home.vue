<script setup>

import { useRouter } from 'vue-router'
import { getStore } from '@/store'
import { homeImages } from '@/utils/useImages.js'
import { scenicArea } from '@/utils/useData.js'
const router = useRouter()
const store = getStore()
const toHome = () => {
  store.counter++
  console.log(store.counter)
  router.push('/page')
}
const urls = homeImages
</script>

<template>
  <main h-screen w-screen py-10px px-8px box-border>
    <van-swipe class="home-swipe" lazy-render>
      <van-swipe-item v-for="item in urls" :key="item">
        <img
          class="home-swipe__image"
          :src="item"
        />
      </van-swipe-item>
    </van-swipe>
    <div>
      <span>热门景点</span>
      <div>
        <div v-for="item in scenicArea" :key="item.name">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>  
:deep.home-swipe{
  &__image{
    object-position: center center;
    object-fit:fill;
    height: 5rem;
    width: 100%;
  }
  .van-swipe__track{
    align-items: center
  }
}
</style>