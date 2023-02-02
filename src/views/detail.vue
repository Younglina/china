<script setup>
import { scenicArea } from '@/utils/useData.js'
import { guide } from '@/utils/useMap.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

let detailData = reactive({})
const queryName = route.query.name
const curData = scenicArea.find(item => item.name === queryName)
detailData = curData || {}
</script>

<template>
  <main>
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.images" :key="item.name">
        <img class="home-swipe__image" :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div class="detail-info">
      <p class="detail-info__title">{{ detailData.name }}</p>
      <p>{{ detailData.intorduction }}</p>
      <div>
        <button @click="guide('gd', detailData)">123123</button>
      </div>
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
.detail-info{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ffffff;
  margin: 0 10px;
  padding: 10px;
  &__title{
    font-size: 20px;
    padding-bottom: 10px;
    font-weight: bold;
  }
}
</style>