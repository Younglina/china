<script setup>
import { ref, reactive } from 'vue'
import { showToast, showLoadingToast, closeToast, showSuccessToast } from 'vant'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { uploadImage, submitData, updataByKey } from '@/utils/useData.js'

const route = useRoute()
const router = useRouter()
let commentObj = reactive({ content: '' }) // 留言
const fileList = ref([])
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
  showLoadingToast({
    message: '提交中...',
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
  });
  let commentImages = ""
  const commentDate = new Date()
  if (fileList.value.length) {
    commentImages = fileList.value.map(item => `${areaKey}_${+commentDate}_${item.file.name}`)
  }
  const commentData = {
    "content": commentObj.content,
    "datetime": (commentDate.toLocaleString()).replaceAll('/', '-'),
    "images": commentImages
  }
  await updataByKey('comment', { ...commentData, areaKey, areaName, dataType})
  await submitData(areaKey, {...commentData, "nickname": store.userInfo.username,})
  uploadImage(areaKey, fileList.value, +commentDate)
  closeToast();
  showSuccessToast({
    message: '提交成功',
    duration: 600
  })
  setTimeout(() => {
    router.go(-1)
  }, 1000)
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
      <van-button block size="small" round type="primary" native-type="submit">
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