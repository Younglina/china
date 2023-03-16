<script setup>
import { reactive } from 'vue'
import { submitData, queryUser } from '@/utils/useData.js'
import { useStore } from '@/store'
import { showFailToast } from 'vant'
const store = useStore()

const userForm = reactive({ username: '', password: '', likes: [], comment: [], avatar: 'avatar.jpeg' })
const validUser = () => {
  if (!userForm.username || !userForm.password) {
    showFailToast('请填写用户名或密码')
    return false
  }
  return true
}
const onSubmit = async () => {
  if (!validUser()) return
  const user = await queryUser(userForm.username, userForm.password)
  if (!user) {
    showFailToast('用户名或密码错误')
  } else {
    store.userInfo = user
    const states = store.$state
    localStorage.setItem('china-pinia-info', JSON.stringify({ ...states, userInfo: user }))
  }
}
const onRegist = async () => {
  console.log(!validUser(), userForm.username, userForm.password)
  if (!validUser()) return
  const user = await queryUser(userForm.username)
  if (user) {
    showFailToast('当前昵称已存在')
  } else {
    const finishData = await submitData('user', userForm)
    store.userInfo = { ...userForm, userid: finishData.id }
    const states = store.$state
    localStorage.setItem('china-pinia-info', JSON.stringify({ ...states, userInfo: { ...userForm, userid: finishData.id } }))
  }
}
</script>
<template>
  <div class="sign-page">
    <van-form>
      <van-cell-group inset>
        <van-field v-model="userForm.username" name="昵称" label="昵称" placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]" />
        <van-field v-model="userForm.password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="sign-action">
        <van-button size="small" round block type="success" @click="onRegist">
          注册
        </van-button>
        <van-button size="small" round block type="primary" @click="onSubmit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang='scss'>
.sign-page {
  height: 100vh;
  padding-bottom: var(--van-tabbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/yyc_3.jpeg);
  background-size: cover;
  background-position: center;
}

.sign-action {
  margin: 16px;
  display: flex;
}
</style>