<script setup>
import { useRouter } from 'vue-router'
import { scenicArea } from '@/utils/useData.js'

const props = defineProps({
  cardType: String
})
// const emit = defineEmits(['toPage'])
// emit('toPage', {})

const router = useRouter()
const toPage = () => {
  router.push(`/page${props.cardType}`)
}
</script>

<template>
  <div class="common-card">
    <p class="wy-title" @click="toPage">热门景点<van-icon name="arrow" /></p>
    <div class="card-body">
      <div v-for="item in scenicArea.slice(0,5)" class="card-body__item" :key="item.name">
        <img class="card-body__image" :src="item.images[0]" alt="">
        <p class="card-body__name">{{ item.name }}</p>
        <p class="card-body__desc">{{ item.desc }}</p>
        <p class="card-body__tag">{{ item.tags.join('、') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>  
.card-body{
  white-space: nowrap;
  overflow-y: auto;
  display: flex;
  &__item{
    padding: 6px;
  }
  &__image{
    width: 3.4rem;
    height: 3.4rem;
    object-position: center center;
    object-fit:fill;
  }
  &__name,&__desc,&__tag{
    margin: 4px 0;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__desc,&__tag{
    font-size: 14px;
    color: #888;
  }
}
</style>