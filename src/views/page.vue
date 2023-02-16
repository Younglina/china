<script setup>
import { ref, reactive } from 'vue'
import { showToast, showLoadingToast, closeToast, showSuccessToast } from 'vant'
import 'vant/es/toast/style';
import { useRouter, useRoute } from 'vue-router'
import { uploadImage, uploadComment } from '@/utils/useData.js'

const route = useRoute()
const router = useRouter()
let commentObj = reactive({ content: '', nickname: '' }) // 留言
const fileList = ref([])
const { areaKey } = route.query

async function setCommnetData() {
  if (!commentObj.nickname) {
    showToast('还没有填写昵称哦');
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
    commentImages = fileList.value.map(item => `${areaKey}_${+commentDate}${item.file.name}`).join(',')
  }
  const commentData = {
    "nickname": commentObj.nickname,
    "content": commentObj.content,
    "datetime": (commentDate.toLocaleString()).replaceAll('/', '-'),
    "images": commentImages
  }
  await uploadComment(areaKey, commentData)
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
      <van-field v-model="commentObj.nickname" style="margin-bottom: 10px;" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="commentObj.content" style="margin-bottom: 10px;" label="留言" rows="2" autosize type="textarea"
        placeholder="说点什么吧~" />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="9" />
        </template>
      </van-field>
    </van-cell-group>
    <div class="action-button">
      <van-button block small square @click="router.go(-1)">
        取消
      </van-button>
      <van-button block small square type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<style lang="scss" scoped>
.commnet-form {
  position: relative;
  height: 100vh;
  overflow-y: auto;

  :deep(.van-cell-group) {
    margin: 0
  }

  .action-button {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>