<script setup>
import { scenicArea } from '@/utils/useData.js'
import { guide } from '@/utils/useMap.js'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onBeforeMount } from 'vue'
import Http from '@/utils/request.js'
const router = useRouter()
const route = useRoute()

let detailData = ref({})
let isLike = ref(false)
let message = ref('')
const queryName = route.query.name
const curData = scenicArea.find(item => item.name === queryName)
detailData.value = curData || {}

const actions = [{ name: '高德地图', type: 'gd' }, { name: '百度地图', type: 'bd' }]
const showAction = ref(false)
const onSelect = (v) => {
  console.log(v)
  guide(v.type, detailData)
}
const randomAvatar = ['linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)', 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)', 'linear-gradient(to top, #feada6 0%, #f5efef 100%)', 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',]
let aryCommend = ref([])
onBeforeMount(() => {
  Http.get('/commend').then(res => {
    aryCommend.value = res.data
  })
})
</script>

<template>
  <main class="detail-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.images" :key="item.name">
        <img class="home-swipe__image" :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div class="detail-container">
      <div class="detail-info">
        <div class="detail-info__title">
          <p>{{ detailData.name }}</p>
          <van-icon @click="isLike = !isLike" :name="isLike ? 'like' : 'like-o'" :color="isLike ? 'red' : 'inherit'" />
        </div>
        <van-divider />
        <div class="detail-info__address">
          <p>{{ detailData.address }}</p>
          <div @click="showAction = !showAction">
            <van-icon name="location-o" size="0.5rem" />
            <p>地图</p>
          </div>
        </div>
        <van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" />
      </div>
      <div class="detail-info">
        <p class="detail-info__intor">{{ detailData.intorduction }}</p>
      </div>
      <div class="detail-info">
        <van-field v-model="message" style="margin-bottom: 10px;" label="留言" placeholder="说点什么吧~" />
        <div v-for="(item, idx) in aryCommend" :key="idx" class="detail-comment">
          <div class="detail-comment__user">
            <div class="detail-comment__avatar" :style="{ backgroundImage: randomAvatar[idx % 10] }"></div>
            <div>
              <p class="detail-comment__username">{{ item.name }}</p>
              <p class="detail-comment__time">{{ item.datetime }}</p>
            </div>
          </div>
          <p class="detail-comment__content">{{ item.content }}</p>
          <van-divider />
        </div>
      </div>
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

  .van-swipe__indicators {
    bottom: 30px;
  }
}

.detail-page {
  height: 100vh;
  overflow-y: auto;
}

.detail-container {
  position: absolute;
  margin-top: -26px;
  padding: 0 8px;
  overflow-y: auto;
  border-radius: 20px;
  // box-shadow: 18px 10px 20px #ffffff, -18px 10px 20px #ffffff;
}

.detail-info {
  border-radius: 12px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;

  &__title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  &__address {
    display: flex;
    justify-content: center;

    >p {
      flex: 1;
    }

    >div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
  }

  &__intor {
    font-size: 14px;
    text-indent: 1.4em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.detail-comment {
  padding: 0 10px;

  &__user {
    display: flex;
  }

  &__avatar {
    min-width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &__username {
    font-weight: bold;
  }

  &__time {
    font-size: 12px;
    color: #666;
  }

  &__content {
    font-size: 14px;
    padding-top: 4px;
  }
}
</style>