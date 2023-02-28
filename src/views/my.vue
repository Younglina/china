<script setup>
import sign from './sign.vue'
import { ref, computed } from 'vue'
import { ImageBaseUrl } from '@/utils/useData.js'
import { useStore } from '@/store'
const store = useStore()
let userInfo = computed(()=>{
  const info = store.userInfo
  if(info){
    info.avatar = ImageBaseUrl+info.avatar
  }
  return info
})

const onSignOut = () => {
  store.userInfo = null
  const piniaData = JSON.parse(localStorage.getItem('china-pinia-info'))
  piniaData.userInfo = null
  localStorage.setItem('china-pinia-info', JSON.stringify(piniaData))
}
</script>
<template>
  <div v-if="userInfo" class="userinfo">
    <div class="userinfo-base card">
      <!-- <img :src="userInfo.avatar" alt="头像"> -->
      <img src="../assets/images/avatar.jpeg" alt="头像">
      <div class="userinfo-username">{{ userInfo.username }}</div>
      <div class="userinfo-ext">
        <div>{{ userInfo.likes.length }} 喜欢</div>
        <div>{{ userInfo.comment.length }} 评论</div>
      </div>
    </div>
    <van-button round block size="small" type="primary" @click="onSignOut">
      退出登录
    </van-button>
  </div>
  <sign v-else></sign>
</template>
<style scoped lang='scss'>
.userinfo{
  padding: 50px 20px 0;
  .card{
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    background: #FFFFFF;
    padding: 10px;
  }
  &-base{
    position: relative;
    img{
      position: absolute;
      width: 1.6rem;
      height: 1.6rem;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-username{
    padding-top: 1rem;
    text-align: center;
    font-size: 0.5rem;
    font-weight: bold;
  }
  &-ext{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.2rem;
    color: #888;
    >div{
      position: relative;
      padding: 4px 6px;
    }
    div + div{
      &::before{
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
}
</style>