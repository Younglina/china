<script setup>
import { useRouter, useRoute } from 'vue-router'
import { getStore } from '@/store'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const dataType = route.query.type
const toDetail = (name) => {
  router.push({ path: '/detail', query: { name, dataType } })
}
const scenicArea = ref([])
const store = getStore()
scenicArea.value = store[dataType]
</script>

<template>
  <main class="preview-page">
    <h3>占个位置</h3>
    <div class="card">
      <div v-for="item in scenicArea" class="card-item" :key="item.name" @click="toDetail(item.key)">
        <img class="card-item__image" :src="item.images[0]" loading="lazy" />
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
  </main>
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
        // border-top-left-radius: 50%;
        // border-top-right-radius: 50%;
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
      }

      &__tag {
        color: #888;
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