<script setup>
import { useRouter, useRoute } from 'vue-router'
import { scenicArea, navCard } from '@/utils/useData.js'
const router = useRouter()
const route = useRoute()
const toHome = () => {
  router.push('/')
}
console.log(route.query)
</script>

<template>
  <main class="preview-page">
    <h3>一个介绍</h3>
    <div class="card">
      <div v-for="item in scenicArea" class="card-item" :key="item.name">
        <img
          class="card-item__image"
          :src="item.images[0]"
        />
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
  .preview-page{
    .card{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px 16px;
      &-item{
        &__image{
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
        }
        &__info{
          display: flex;
          flex-direction: column;
          height: calc(100% - 180px);
        }
        p {
          padding: 3px 0;
        }
        &__name{
          font-weight: 600;
        }
        &__desc{
          flex: 1;
        }
        &__tag{
          color: #888;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>