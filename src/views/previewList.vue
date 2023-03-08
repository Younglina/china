<script setup>
import { useRouter, useRoute } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'
import { navCard } from '@/utils/useData.js'
import { getStore } from '@/store'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const dataType = route.query.type
const toDetail = (name) => {
  showLoadingToast({
    message: '加载中...',
    duration: 0,
    loadingType: 'spinner',
  });
  router.push({ path: '/detail', query: { name, dataType } })
  closeToast()
}
const scenicArea = ref([])
const store = getStore()
scenicArea.value = store[dataType]
const Strs = computed(()=>{
  const types = navCard.find(item=>item.value===dataType)
  return types?types.text:''
})
</script>

<template>
  <div class="preview-page">
    <p class="wy-title">特色{{ Strs }}</p>
    <div class="card">
      <div v-for="item in scenicArea" class="card-item" :key="item.name" @click="toDetail(item.key)">
        <img class="card-item__image" :src="item.images[0]" loading="lazy" :alt="item.name"/>
        <img class="card-item__wenli" src="../assets/images/wenli_1.png" />
        <div class="card-item__info">
          <p class="card-item__name">{{ item.name }}</p>
          <p class="card-item__desc">{{ item.desc }}</p>
          <p class="card-item__tag">
            <span><van-icon name="location-o" />{{ item.locat }}</span>
            <span><van-icon name="label-o" />{{ item.areaType }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preview-page {
  padding: 10px;

  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px 16px;

    &-item {
      position: relative;

      &__image {
        width: 100%;
        height: 160px;
        margin-bottom: 12px;
        object-fit: cover;
        border-radius: 6px;
      }

      p {
        padding: 3px 0;
      }

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 180px);
      }
      &__name {
        font-weight: 600;
      }

      &__desc {
        color: #555;
        font-size: 12px;
      }

      &__tag {
        color: #888;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }

      &__wenli {
        width: 26px;
        height: 26px;
        top: 146px;
        left: calc(50% - 13px);
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
      }
    }
  }
}
</style>