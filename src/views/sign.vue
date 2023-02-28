<script setup>
import { reactive } from 'vue'
import { submitData } from '@/utils/useData.js'
import { useStore } from '@/store'
const store = useStore()
const piniaInfo = localStorage.getItem('china-pinia-info') || {}

const userForm = reactive({username:'',password:'',likes:[],comment:[]})
const onSubmit = () => {
  const piniaInfoData = JSON.parse(piniaInfo)
  piniaInfoData.userInfo = userForm
  localStorage.setItem('china-pinia-info', JSON.stringify(piniaInfoData))
  store.userInfo = userForm
}
</script>
<template>
  <div class="sign-page">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userForm.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang='scss'>
.sign-page{
  height: 100vh;
  padding-bottom: var(--van-tabbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  // background-image: url(https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/yyc_3.jpeg);
  background-size: 100% 100%;
}
</style>