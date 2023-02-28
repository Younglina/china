<script setup>
import { showConfirmDialog, showFailToast } from 'vant';
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import { useStore } from '@/store'
import { guide } from '@/utils/useMap.js'
import { getCommnet, updataByKey, isLogin } from '@/utils/useData.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onBeforeMount } from 'vue'
import CommnetList from '@/components/CommentList.vue'
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
  const dataList = store[dataType]
  const curData = dataList.find(item => item.key === name)
  detailData = curData || {}
  isLike.value = store.userInfo ? store.userInfo.likes.includes(detailData.key) : false
  const txComment = await getCommnet(name);
  const { data: mockComment } = await Http.get('/commend')
  aryComment.value = txComment.concat(mockComment)
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
const toComment = () => {
  if (!isLogin()) {
    showFailToast('请去我的页面进行登录或注册')
    return
  }
  router.push(`/page?areaKey=${detailData.key}&areaName=${detailData.name}`)
}

// 喜欢
const handleLike = () => {
  if (!isLogin()) {
    showFailToast('请去我的页面进行登录或注册')
    return
  }
  isLike.value = !isLike.value
  updataByKey('likes', {areaKey: detailData.key, isLike: isLike.value})
}
</script>

<template>
  <div class="detail-page">
    <van-swipe v-if="detailData.images.length" class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in detailData.images" :key="item.name">
        <img class="home-swipe__image" :src="item" :alt="item.name" />
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
          <div v-if="detailData.introduction.length > 50" class="detail-info__showmore" @click="showMore = !showMore">
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
        <CommnetList :datalist="aryComment"></CommnetList>
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

</style>