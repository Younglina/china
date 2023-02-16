
<script setup>
import { reactive, ref } from 'vue'
import { navCard, uploadComment, uploadImage } from '@/utils/useData.js'
import { showLoadingToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style';

const formData = reactive({
  name: '',
  key: '',
  tags: '',
  locat: '',
  areaType: '',
  lng: '',
  lat: '',
  address: '',
  desc: '',
  phone: '',
  openTime: '',
  cost: '',
  introduction: '',
  images: []
});
const dataType = ref(navCard[0].text)
const showPicker = ref(false)
const submitLoading = ref(false)
const fileList = ref([])

const onSubmit = async () => {
  submitLoading.value = true
  showLoadingToast({
    message: '提交中...',
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  });
  const submitData = {...formData}
  const timeKey = +new Date()
  submitData.tags = submitData.tags.replaceAll('，', ',').split(',')
  const oldKey = submitData.key
  submitData.key = `${oldKey}_${timeKey}`

  const type = navCard.find(item=>item.text ===dataType.value).value
  await uploadComment(type,submitData)
  uploadImage(oldKey, fileList.value, timeKey)
  showSuccessToast({
    message: '提交成功',
    duration: 600
  })
  submitLoading.value = false
  // setTimeout(() => {
  //   router.go(-1)
  // }, 1000)
}
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  dataType.value = selectedOptions[0].text;
}
</script>
<template>
  <div class="add-page">
    <van-form ref="form" label-width="100px" @submit="onSubmit" @failed="onFailed">
      <van-field v-model="formData.name" label="名称" placeholder="请输入名称" required />
      <van-field v-model="formData.key" label="关键字" placeholder="拼音首字母缩写" required />
      <van-field v-model="dataType" is-link readonly label="数据类型" placeholder="选择数据类型" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="navCard" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <van-field v-model="formData.tags" label="标签" placeholder="用逗号隔开，如昌江区，博物馆" />
      <van-field v-model="formData.areaType" label="类型" placeholder="如博物馆、商场、餐馆" />
      <van-field v-model="formData.locat" label="所在地" placeholder="大致街区，如昌江区" />
      <van-field v-model="formData.address" label="详细地址" placeholder="请输入详细地址" />
      <van-field v-model="formData.phone" label="联系电话" placeholder="请输入联系电话" />
      <van-field v-model="formData.openTime" label="开放时间" placeholder="请输入开放时间" />
      <van-field v-model="formData.cost" label="人均消费" placeholder="请输入人均消费" />
      <van-field v-model="formData.introduction" label="简介" type="textarea" rows="3" placeholder="请输入简介" />
      <van-field v-model="formData.lng" label="经度" placeholder="请输入经度" />
      <van-field v-model="formData.lat" label="纬度" placeholder="请输入纬度" />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </template>
      </van-field>
      <van-button type="primary" native-type="submit" loading-type="spinner" :loading="submitLoading">提交</van-button>
    </van-form>
</div>
</template>

<style lang="scss" scoped>
.add-page {
  height: 100vh;
  overflow-y: auto;
}
</style>