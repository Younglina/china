<script setup>
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import { getCommnet, updataByKey, submitData, verifyData} from '@/utils/useData.js'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { ref, onMounted } from 'vue'
import CommnetList from '@/components/CommentList.vue'

let loading = ref(true)
let aryComment = ref([])

onMounted(async () => {
  closeToast()
  showLoadingToast({
    message: '加载中...',
    duration: 0,
    loadingType: 'spinner',
  });
  const txComment = await getCommnet('verify', {key: 'isverify', value: 'no'});
  aryComment.value = txComment
  loading.value = false
  closeToast()
})

const handleVerify = async (data) => {
  const { areaKey, areaName, dataType, nickname, images, datetime, content, userid, id} = data
  await verifyData(id)
  await updataByKey('comment', { content, images, datetime, areaKey, areaName, dataType, userid})
  await submitData(areaKey, { content, images, datetime, nickname,userid})
  showToast('审核成功')
}
</script>

<template>
  <div class="detail-page">
    <CommnetList :datalist="aryComment" @verify="handleVerify"></CommnetList>
  </div>
</template>

<style lang="scss" scoped>
</style>