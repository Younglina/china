<script setup>
import CommonCard from '@/components/CommonCard.vue'
import { getData, navCard } from '@/utils/useData.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const toView = (key) => {
  router.push(`/preview?type=${key}`)
}
const scenicArea = ref([])
getData('scenic').then(res => {
  scenicArea.value = res
  console.log(res)
});
</script>

<template>
  <main class="home-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in scenicArea" :key="item.name">
        <img class="home-swipe__image" :src="item.images[0]" />
      </van-swipe-item>
    </van-swipe>
    <div class="home-page-nav">
      <div v-for="item in navCard" :key="item.key" @click="toView(item.key)">
        <div class="home-page-nav__image">
          <img :src="item.image" />
        </div>
        <p>{{ item.type }}</p>
      </div>
    </div>
    <CommonCard card-type="scenic" :card-data="scenicArea" />
  </main>
</template>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;

  &-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 0;

    img {
      width: 0.6rem;
      height: 0.6rem;
    }

    &__image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.8rem;
      height: 0.8rem;
      background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
      border-radius: 4px;
    }

    p {
      text-align: center;
      font-size: 12px;
    }
  }
}

:deep.home-swipe {
  &__image {
    object-position: center center;
    object-fit: fill;
    height: 5rem;
    width: 100%;
  }

  .van-swipe__track {
    align-items: center
  }
}
</style>