<script setup>
import { useRouter } from 'vue-router'
import { navCard } from '@/utils/useData.js'
import { computed } from 'vue'
import { showLoadingToast, closeToast } from 'vant'

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
  closeToast()
}
</script>

<template>
  <div class="common-card">
    <p class="wy-title">特色{{ Strs }}</p>
    <div class="card-body">
      <div v-for="item in cardData.slice(0, 5)" class="card-body__item" :key="item.name" @click="toDetail(item.key)">
        <img class="card-body__image" :src="item.images[0]" alt="">
        <p class="card-body__name">{{ item.name }}</p>
        <p class="card-body__desc">{{ item.desc }}</p>
        <!-- <p class="card-body__tag">{{ item.tags.join('、') }}</p> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  white-space: nowrap;
  overflow-y: auto;
  display: flex;

  &__item {
    padding: 6px;
  }

  &__image {
    width: 3.4rem;
    height: 3.4rem;
    object-position: center center;
    object-fit: fill;
  }

  &__name,
  &__desc,
  &__tag {
    margin: 4px 0;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__desc,
  &__tag {
    font-size: 14px;
    color: #888;
  }
}
</style>