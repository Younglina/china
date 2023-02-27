
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { navCard, uploadComment, uploadImage } from '@/utils/useData.js'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style';
import AMapLoader from '@amap/amap-jsapi-loader';

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '1798020d0518464df4e389ee55365c02'
  }
  AMapLoader.load({
    "key": "c35481dff089b8a651daaca8ed71c38c",
    "version": "2.0",
    "plugins": ['AMap.Autocomplete'],
  })
})


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
  try {
    const submitData = { ...formData }
    const timeKey = +new Date()
    submitData.tags = submitData.tags.replaceAll('，', ',').split(',')
    const oldKey = submitData.key
    submitData.key = `${oldKey}_${timeKey}`

    const type = navCard.find(item => item.text === dataType.value).value
    await uploadComment(type, submitData)
    uploadImage(oldKey, fileList.value, timeKey)
    showSuccessToast({
      message: '提交成功',
      duration: 1000
    })
    submitLoading.value = false
    setTimeout(() => {
      router.go(-1)
    }, 1200)
  } catch (e) {
    console.dir(e)
    showSuccessToast({
      message: '提交出错',
      duration: 1000
    })
    submitLoading.value = false
  }
}
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  dataType.value = selectedOptions[0].text;
}

let LngLatList = reactive([])
const showPickerLngLat = ref(false)
const showLngLatList = () => {
  if (!formData.name) {
    showFailToast('请先填写名称')
    return
  }
  AMapLoader.load(['AMap.Autocomplete']).then((AMap) => {
    AMap.plugin('AMap.AutoComplete', () => {
      // 实例化Autocomplete
      const autoOptions = {
        city: '江西省',
        citylimit: true
      }
      const autoComplete = new AMap.Autocomplete(autoOptions);
      autoComplete.search('景德镇市' + formData.name, function (status, result) {
        // 搜索成功时，result即是对应的匹配数据
        LngLatList = result.tips.map(item => {
          return {
            name: item.name,
            subname: item.address,
            district: item.district,
            lnglat: item.location ? `${item.location.lng},${item.location.lat}` : ''
          }
        })
        showPickerLngLat.value = true
      })
    })
  }).catch((e) => {
    console.error(e);
    showFailToast('查询详细地址失败')
  });
}
const onConfirmAddress = (v) => {
  formData.address = v.district + v.subname
  const lnglat = v.lnglat.split(',')
  if (lnglat.length > 0) {
    formData.lng = lnglat[0]
    formData.lat = lnglat[1]
  }
  showPickerLngLat.value = false;
}
</script>
<template>
  <div class="add-page">
    <van-form ref="form" label-width="100px" @submit="onSubmit" @failed="onFailed">
      <van-field v-model="formData.name" label="名称" placeholder="请输入名称" required />
      <van-field v-model="formData.key" label="关键字" placeholder="拼音首字母缩写" required />
      <van-field v-model="formData.locat" label="所在地" placeholder="大致街区，如昌江区" required />
      <van-field v-model="formData.address" is-link readonly label="详细地址" placeholder="请选择详细地址" @click="showLngLatList" />
      <van-action-sheet v-model:show="showPickerLngLat" :actions="LngLatList" cancel-text="取消" description="请选择详细地址"
        @select="onConfirmAddress" close-on-click-action />
      <van-field v-model="dataType" is-link readonly label="数据类型" placeholder="选择数据类型" @click="showPicker = true" />
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="navCard" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <van-field v-model="formData.tags" label="标签" placeholder="用逗号隔开，如昌江区，博物馆" />
      <van-field v-model="formData.areaType" label="类型" placeholder="如博物馆、商场、餐馆" />
      <van-field v-model="formData.phone" label="联系电话" placeholder="请输入联系电话" />
      <van-field v-model="formData.openTime" label="开放时间" placeholder="请输入开放时间" />
      <van-field v-model="formData.cost" label="人均消费" placeholder="请输入人均消费" />
      <van-field v-model="formData.desc" label="描述" type="textarea" rows="3" placeholder="请输入一句话描述" />
      <van-field v-model="formData.introduction" label="详细介绍" type="textarea" rows="3" placeholder="请输入详细介绍" />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </template>
      </van-field>
      <van-button round block type="primary" native-type="submit" loading-type="spinner" :loading="submitLoading">提交</van-button>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.add-page {
  height: 100vh;
  overflow-y: auto;
}
</style>