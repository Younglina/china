<script setup>
import { showConfirmDialog, showImagePreview, showFailToast } from 'vant';
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import { useStore } from '@/store'
import { guide } from '@/utils/useMap.js'
import { getCommnet, setLike, isLogin } from '@/utils/useData.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onBeforeMount } from 'vue'
import Http from '@/utils/request.js'
const ImageBaseUrl = 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/'
const router = useRouter()
const route = useRoute()

let detailData = reactive({}) // 数据详情
let isLike = ref(false) // 是否喜欢
let showMore = ref(false) // 查看更多
let aryComment = ref([])

onBeforeMount(async () => {
  // 获取对应的数据详情
  const { name, dataType } = route.query
  const store = useStore()
  console.log(store)
  const dataList = store[dataType]
  const curData = dataList.find(item => item.key === name)
  detailData = curData || {}
  isLike.value = store.userInfo?store.userInfo.likes.includes(detailData.key):false
  const txComment = await getCommnet(name);
  const { data: mockComment } = await Http.get('/commend')
  aryComment.value = txComment.concat(mockComment).map(item => {
    if (item.images) {
      item.imagesArr = item.images.map(item => ImageBaseUrl + item)
    }
    return item
  })
})

// 地图导航
const actions = [{ name: '高德地图', type: 'gd' }, { name: '百度地图', type: 'bd' }]
const showAction = ref(false)
const onSelect = (v) => {
  guide(v.type, detailData)
}

// 电话
const phoneCall = ref('phoneCall')
const showCall = () => {
  showConfirmDialog({
    message: `确定拨打电话?\n${detailData.phone}`,
    showCancelButton: true,
  }).then(() => {
    phoneCall.value.click();
  })
}

// 评论相关
const randomAvatar = ['linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)', 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)', 'linear-gradient(to top, #feada6 0%, #f5efef 100%)', 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',]
const toComment = () => {
  router.push(`/page?areaKey=${detailData.key}`)
}
const imagePreview = (imgs, idx) => {
  showImagePreview({
    images: imgs,
    startPosition: idx,
    closeable: true,
  })
}

// 喜欢
const handleLike = () => {
  if(!isLogin()){
    showFailToast('请去我的页面进行登录或注册')
    return
  }
  isLike.value = !isLike.value
  setLike(detailData.key, isLike.value)
}
</script>

<template>
  <div class="detail-page">
    <van-swipe v-if="detailData.images.length" class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.images" :key="item.name">
        <img class="home-swipe__image" :src="item"  :alt="item.name"/>
      </van-swipe-item>
    </van-swipe>
    <van-empty v-else description="暂无图片" />
    <div class="detail-container">
      <div class="detail-info">
        <div class="detail-info__title">
          <p>{{ detailData.name }}</p>
          <van-icon @click="handleLike" :name="isLike ? 'like' : 'like-o'" :color="isLike ? 'red' : 'inherit'" />
        </div>
        <van-divider />
        <div class="detail-info__address">
          <div>
            <p>{{ detailData.address }}</p>
            <div class="detail-info__cost" v-if="detailData.cost || detailData.openTime">
              <p><van-icon name="clock-o" />{{ detailData.openTime }}</p>
              <p class="detail-info__cost__money"><van-icon name="cash-o" />{{ detailData.cost }}</p>
            </div>
          </div>
          <div class="detail-info__action">
            <div @click="showAction = !showAction">
              <van-icon name="location-o" size="0.5rem" />
              <p>地图</p>
            </div>
            <div v-if="detailData.phone" @click="showCall">
              <a :href="`tel:${detailData.phone}`" ref="phoneCall" style="display: none;"></a>
              <van-icon name="phone-o" size="0.5rem" />
              <p>电话</p>
            </div>
          </div>
        </div>
        <van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" />
      </div>
      <div class="detail-info">
        <p class="wy-title">介绍</p>
        <template v-if="detailData.introduction">
          <p class="detail-info__intor">{{ detailData.introduction?.slice(0, 50) + '...' }}</p>
          <div v-if="detailData.introduction.length>50" class="detail-info__showmore" @click="showMore = !showMore">
            <p>查看更多</p>
          </div>
        </template>
        <p v-else>暂无</p>
        <van-popup v-model:show="showMore" round position="bottom" :style="{ height: '50%', padding: '20px' }">
          <p style="text-indent: 2em">{{
            detailData.introduction
          }}</p>
        </van-popup>
      </div>
      <div class="detail-info">
        <van-button @click="toComment" type="primary" block size="small" round>去留言</van-button>
        <div v-for="(item, idx) in aryComment" :key="idx" class="detail-comment">
          <div class="detail-comment__user">
            <div class="detail-comment__avatar" :style="{ backgroundImage: randomAvatar[idx % 10] }"></div>
            <div>
              <p class="detail-comment__username">{{ item.nickname }}</p>
              <p class="detail-comment__time">{{ item.datetime }}</p>
            </div>
          </div>
          <p class="detail-comment__content">{{ item.content }}</p>
          <div v-if="item.imagesArr" class="detail-comment__imgs">
            <van-image v-for="(img, idx) in item.imagesArr" @click="imagePreview(item.imagesArr, idx)" width="2rem"
              height="2rem" fit="cover" lazy-load :key="item" :src="img">
              <template v-slot:error>
                加载失败
              </template>
            </van-image>
          </div>
          <van-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep.home-swipe {
  &__image {
    object-position: center center;
    object-fit: cover;
    height: 46vh;
    width: 100%;
  }

  .van-swipe__track {
    align-items: center
  }

  .van-swipe__indicators {
    bottom: 30px;
  }
}

.detail-page {
  overflow-y: auto;
}

.detail-container {
  position: absolute;
  margin-top: -26px;
  padding: 0 8px var(--van-tabbar-height);
  overflow-y: auto;
  border-radius: 20px;
  // box-shadow: 18px 10px 20px #ffffff, -18px 10px 20px #ffffff;
}

.detail-info {
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;

  &__title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  &__address {
    display: flex;
    justify-content: space-between;

    >p {
      flex: 1;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    >div {
      min-width: 28px;
      padding: 0 4px;
    }
  }

  &__cost {
    display: flex;
    font-size: 14px;
    padding-top: 2px;

    .van-icon-clock-o {
      color: #409EFF;
      margin-right: 2px;
    }

    &__money {
      margin-left: 12px;
      color: #F56C6C;
    }
  }

  &__intor {
    font-size: 14px;
    text-indent: 1.4em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__showmore {
    position: absolute;
    bottom: 10px;
    right: 6px;
    font-size: 12px;
    color: #1989fa;
  }
}

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