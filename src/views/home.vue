<script setup>
import CommonCard from '@/components/CommonCard.vue'
import { showLoadingToast, closeToast } from 'vant'
import 'vant/es/toast/style';
import { navCard } from '@/utils/useData.js'
import { useRouter } from 'vue-router'
import { getStore } from '@/store'
import { ref } from 'vue'
const router = useRouter()
const toView = (key) => {
  showLoadingToast({
    message: '加载中...',
    duration: 0,
    loadingType: 'spinner',
  });
  router.push(`/preview?type=${key}`)
  closeToast()
}
const scenicData = ref([])
const foodData = ref([])
const porcelainData = ref([])
const store = getStore()
scenicData.value = store.scenic
foodData.value = store.food
porcelainData.value = store.porcelain
</script>

<template>
  <main class="home-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in scenicData" :key="item.name">
        <img class="home-swipe__image" :src="item.images[0]" :alt="item.name"/>
      </van-swipe-item>
    </van-swipe>
    <div class="home-page-nav">
      <div v-for="item in navCard" :key="item.value" @click="toView(item.value)">
        <div class="home-page-nav__image">
          <img :src="item.image" loading="lazy" />
        </div>
        <p>{{ item.text }}</p>
      </div>
    </div>
    <CommonCard card-type="scenic" :card-data="scenicData" />
    <CommonCard card-type="food" :card-data="foodData" />
    <CommonCard card-type="porcelain" :card-data="porcelainData" />
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