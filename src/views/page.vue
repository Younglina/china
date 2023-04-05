<script setup>
import { ref, reactive } from 'vue'
import { showToast, showLoadingToast, closeToast, showSuccessToast } from 'vant'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { uploadImage, submitData } from '@/utils/useData.js'

const route = useRoute()
const router = useRouter()
let commentObj = reactive({ content: '' }) // 留言
const fileList = ref([])
const submitLoading = ref(false)
const { areaKey, areaName, dataType } = route.query

async function setCommnetData() {
  const store = useStore()
  if (!store.userInfo) {
    showToast('请去我的页面进行登录或注册');
    return
  }
  if (!commentObj.content && !fileList.value.length) {
    showToast('还没有填写内容或图片哦');
    return
  }
  if(submitLoading.value === true) return
  submitLoading.value = true
  showLoadingToast({
    message: '提交中...',
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  });
  let commentImages = []
  const commentDate = new Date()
  if (fileList.value.length) {
    commentImages = fileList.value.map(item => `${areaKey}_${+commentDate}_${item.file.name}`)
  }
  const datetime =  (commentDate.toLocaleString()).replaceAll('/', '-')
  const commentData = {
    "content": commentObj.content,
    "images": commentImages,
    datetime
  }
  await submitData('verify', {...commentData, datetime, "nickname": store.userInfo.username, "userid": store.userInfo.userid, areaKey, areaName, dataType})
  uploadImage(areaKey, fileList.value, +commentDate)
  closeToast();
  showSuccessToast({
    message: '提交成功，审核后将会显示。',
    duration: 1200
  })
  setTimeout(() => {
    router.go(-1)
    submitLoading.value = false
  }, 1300)
}

</script>

<template>
  <van-form class="commnet-form" @submit="setCommnetData">
    <van-cell-group inset>
      <van-field v-model="commentObj.content" style="margin-bottom: 10px;" label="留言" rows="2" autosize type="textarea"
        placeholder="说点什么吧~" />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </template>
      </van-field>
    </van-cell-group>
    <div class="action-button">
      <van-button block size="small" round type="success" @click="router.go(-1)">
        取消
      </van-button>
      <van-button block size="small" round type="primary" native-type="submit" :loading="submitLoading" loading-text="提交中..." >
        提交
      </van-button>
    </div>
  </van-form>
</template>
<style lang="scss" scoped>
.commnet-form {
  position: relative;
  overflow-y: auto;

  :deep(.van-cell-group) {
    margin: 0
  }

  .action-button {
    display: flex;
  }
}
</style>