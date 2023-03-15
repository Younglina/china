<script setup>
import sign from './sign.vue'
import { watch, computed, ref } from 'vue'
import { ImageBaseUrl } from '@/utils/useData.js'
import CommnetList from '@/components/CommentList.vue'
import { useStore } from '@/store'
import vconsole from 'vconsole'
let clickCount = ref(0)
const watchConsole = watch(clickCount, () => {
  if(clickCount.value>=5){
    new vconsole();
    watchConsole();
  }
})

let likesList = ref([])
const store = useStore()
let userInfo = computed(() => {
  const info = store.userInfo?{...store.userInfo}:null
  if (info) {
    info.avatar = info.avatar?(ImageBaseUrl + info.avatar):''
    if(info.likes.length>0){
      const arr = [...store.food,...store.scenic,...store.porcelain,...store.play].filter(item=>info.likes.includes(item.key))
      likesList.value = arr.map(item=>{
        return {
          areaName: item.name, // 中文名 展示用
          key: item.key, // key值 对应列表查询用
          dataType: item.dataType, // food||scenic等 对应列表查询用
          content: item.desc, // 描述
        }
      })
    }
  }
  return info
})

const onSignOut = () => {
  store.userInfo = null
  const piniaData = JSON.parse(localStorage.getItem('china-pinia-info'))
  piniaData.userInfo = null
  localStorage.setItem('china-pinia-info', JSON.stringify(piniaData))
}

const active = ref(0);
</script>
<template>
  <div v-if="userInfo" class="userinfo">
    <div class="userinfo-base card">
      <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" @click="clickCount++">
      <img v-else src="../assets/images/avatar.jpeg" alt="头像" @click="clickCount++">
      <div class="userinfo-username">{{ userInfo.username }}</div>
      <div class="userinfo-ext">
        <div>{{ userInfo.likes.length }} 喜欢</div>
        <div>{{ userInfo.comment.length }} 评论</div>
      </div>
    </div>
    <van-tabs v-model:active="active" class="card">
      <van-tab title="我的喜欢">
        <CommnetList v-if="likesList.length>0" type="myLikes" titleKey="areaName" :datalist="likesList"/>
        <van-empty v-else description="暂无喜欢" />
      </van-tab>
      <van-tab title="我的评论">
        <CommnetList v-if="userInfo.comment.length>0" type="myComment" titleKey="areaName" :datalist="userInfo.comment"/>
        <van-empty v-else description="暂无评论" />
      </van-tab>
    </van-tabs>
    <van-button round block size="small" type="primary" @click="onSignOut">
      退出登录
    </van-button>
  </div>
  <sign v-else></sign>
</template>
<style scoped lang='scss'>
.userinfo {
  padding: 50px 20px 0;

  .card {
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    background: #FFFFFF;
    padding: 10px;
    margin-bottom: 20px;
  }

  &-base {
    position: relative;

    img {
      position: absolute;
      width: 1.6rem;
      height: 1.6rem;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &-username {
    padding-top: 1rem;
    text-align: center;
    font-size: 0.5rem;
    font-weight: bold;
  }

  &-ext {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.2rem;
    color: #888;

    >div {
      position: relative;
      padding: 4px 6px;
    }

    div+div {
      &::before {
        content: '';
        width: 1px;
        height: 50%;
        top: 50%;
        transform: translateY(-50%);
        background-color: #888;
        position: absolute;
        left: 0;
      }
    }
  }
}</style>