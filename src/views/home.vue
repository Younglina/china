<script setup>
import CommonCard from '@/components/CommonCard.vue'
import { scenicArea, navCard } from '@/utils/useData.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const toView = (key) => {
  router.push(`/preview?type=${key}`)
}
</script>

<template>
  <main class="home-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in scenicArea" :key="item.name">
        <img
          class="home-swipe__image"
          :src="item.images[0]"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="home-page__nav">
      <div v-for="item in navCard" :key="item.key" @click="toView(item.key)">
        <img :src="item.image"/>
        <p>{{ item.type }}</p>
      </div>
    </div>
    <CommonCard card-type="scenic"/>
  </main>
</template>

<style lang="scss" scoped>  
.home-page{
  height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;
  // background-image: url(../assets/images/bg.jpg);
  // background-repeat: no-repeat;
  // background-size: 100% auto;
  &__nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 0;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p{
      text-align: center;
    }
  }
}
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