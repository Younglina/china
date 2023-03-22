<script setup>
import { showImagePreview } from 'vant';
import { ImageBaseUrl, queryUser } from '@/utils/useData.js'
import { useRouter } from 'vue-router'
import { useStore } from '@/store';
import { ref, watch } from 'vue';
const props = defineProps({
  datalist: { default: [] },
  type: { default: 'detail' },
  titleKey: { default: 'nickname' },
})

const store = useStore()
const verify = ref(false)
watch(()=>store.userInfo,async ()=>{
  if(store.userInfo){
    const user = await queryUser(store.userInfo.username, null, [import.meta.env.VITE_VRF])
    verify.value = !!user
  }
})

const randomAvatar = ['linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)', 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)', 'linear-gradient(to top, #feada6 0%, #f5efef 100%)', 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',]
const imagePreview = (imgs, idx) => {
  showImagePreview({
    images: imgs.map(item => item = ImageBaseUrl + item),
    startPosition: idx,
    closeable: true,
  })
}

const router = useRouter()
const handleListClick = (item) => {
  if (props.type !== 'detail') {
    router.push({ path: '/detail', query: { name: item.key || item.areaKey, dataType: item.dataType } })
  }
}

</script>
<template>
  <div v-for="(item, idx) in datalist" @click.stop="handleListClick(item)" :key="idx" class="detail-comment">
    <div class="detail-comment__user">
      <div v-if="type === 'detail'" class="detail-comment__avatar" :style="{ backgroundImage: randomAvatar[idx % 10] }">
      </div>
      <div>
        <p class="detail-comment__username">{{ item[titleKey] }}</p>
        <p class="detail-comment__time">{{ item.datetime }}</p>
      </div>
      <div v-if="verify" style="margin-left: auto;">
        <van-button @click="$emit('verify', item)" size="mini">审核</van-button>
      </div>
    </div>
    <p class="detail-comment__content">{{ item.content }}</p>
    <div v-if="item.images && item.images.length > 0" class="detail-comment__imgs">
      <van-image v-for="(img, idx) in item.images" @click.stop="imagePreview(item.images, idx)" width="2rem" height="2rem"
        fit="cover" lazy-load :key="item" :src="ImageBaseUrl + img">
        <template v-slot:error>
          加载失败
        </template>
      </van-image>
    </div>
    <van-divider />
  </div>
</template>
<style scoped lang='scss'>
.detail-comment {
  padding: 10px;

  &__user {
    display: flex;
  }

  &__avatar {
    min-width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &__username {
    font-weight: bold;
  }

  &__time {
    font-size: 12px;
    color: #666;
  }

  &__content {
    font-size: 14px;
    padding-top: 4px;
  }

  &__imgs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }

  &__img {
    width: 60px;
    height: 60px;
  }
}
</style>