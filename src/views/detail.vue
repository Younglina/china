<script setup>
import { scenicArea } from '@/utils/useData.js'
import { guide } from '@/utils/useMap.js'
import { useRouter, useRoute } from 'vue-router'
import { reactive,ref } from 'vue'

const router = useRouter()
const route = useRoute()

let detailData = reactive({})
const queryName = route.query.name
const curData = scenicArea.find(item => item.name === queryName)
detailData = curData || {}

const actions = [{name:'高德地图',type:'gd'},{name:'百度地图',type:'bd'}]
const showAction = ref(false)
const onSelect = (v) => {
  console.log(v)
  guide(v.type,detailData)
}
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
      <van-divider />
      <div class="detail-info__address">
        <p>{{ detailData.address }}</p>
        <div @click="showAction = !showAction">
          <!-- <img class="detail-info__location" src="../assets/images/location.png" /> -->
          <van-icon name="location-o" size="0.5rem"/>
          <p>地图</p>
        </div>
      </div>
      <van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" />
      <!-- <p>{{ detailData.intorduction }}</p> -->
    </div>
  </main>
</template>

<style lang="scss" scoped>
:deep.home-swipe {
  &__image {
    object-position: center center;
    object-fit: cover;
    height: 7rem;
    width: 100%;
  }

  .van-swipe__track {
    align-items: center
  }
  .van-swipe__indicators{
    bottom: 30px;
  }
}
.detail-info{
  position: absolute;
  box-shadow: 18px 10px 20px #ffffff, -18px 10px 20px #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ffffff;
  padding: 10px;
  margin-top: -26px;
  left: 8px;
  width: calc(100% - 36px);
  height: calc(100% - 7rem - 2px);
  overflow-y: auto;
  &__title{
    font-size: 20px;
    font-weight: bold;
  }
  &__address{
    display: flex;
    justify-content: center;
    >p{
      flex: 1;
    }
    >div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }
}
</style>