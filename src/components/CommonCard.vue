<script setup>
import { useRouter } from 'vue-router'
import { navCard } from '@/utils/useData.js'
import { computed } from 'vue'
import { showLoadingToast } from 'vant'

const Strs = computed(()=>{
  const types = navCard.find(item=>item.value===props.cardType)
  return types?types.text:''
})
const props = defineProps({
  cardType: String,
  cardData: Array
})
const router = useRouter()
const toDetail = (name) => {
  showLoadingToast({
    message: '加载中...',
    duration: 0,
    loadingType: 'spinner',
  });
  router.push({ path: '/detail', query: { name, dataType: props.cardType } })
}
</script>

<template>
  <div class="common-card">
    <p class="wy-title">特色{{ Strs }}</p>
    <div class="card-body">
    <template v-if="!cardData || cardData.length===0">
      <van-skeleton v-for="item in 3" :key="item">
        <template #template>
          <div>
            <van-skeleton-image />
            <div :style="{ marginTop: '6px' }">
              <van-skeleton-paragraph/>
              <van-skeleton-paragraph row-width="60%" />
            </div>
          </div>
        </template>
      </van-skeleton>
    </template>
      <template v-else>
        <div v-for="item in cardData.slice(0, 5)" class="card-body__item" :key="item.name" @click="toDetail(item.key)">
          <img class="card-body__image" :src="item.images[0]" alt="">
          <p class="card-body__name">{{ item.name }}</p>
          <p class="card-body__desc">{{ item.desc }}</p>
          <div class="card-body__likes">
            <van-icon name="like-o" color="red" />
            <span>{{ item.likes || 0 }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  white-space: nowrap;
  overflow-y: auto;
  display: flex;

  &__item {
    position: relative;
    padding: 6px;
  }

  &__image {
    width: 3.4rem;
    height: 3.4rem;
    object-position: center center;
    object-fit: fill;
  }

  &__name,
  &__desc{
    margin: 4px 0;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__desc{
    font-size: 14px;
    color: #888;
  }

  &__likes{
    position: absolute;
    font-size: 12px;
    top: 10px;
    right: 8px;
    padding: 0px 4px;
    border-radius: 4px;
    min-width: 30px;
    background-color: rgba(0,0,0,.4);
    span{
      color: #fff;
      margin-left: 4px;
    }
  }
}
</style>