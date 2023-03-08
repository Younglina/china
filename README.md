# 景德镇特色预览

使用vue3配套的相关技术栈，开发的一个景德镇特色浏览网站，包含了一些特色小吃、景区、游玩、瓷器，数据来源高德地图、百度百科、美团、大众点评、自己总结的等，包含一些基础的图片、相关的介绍、开放时间、人均消费、地图导航、电话等。  

整个项目的开发流程文档 https://fl1w05tccg.feishu.cn/docx/ALBddtMdfo5pEoxEezectRiVn0b

网站包含的功能有，数据的展示、简单的登录注册、评论、加入喜欢。  

相关技术栈有，vue3、vite、vue-router、vant、pinia、axios、leancloud、腾讯云存储。  

[在线网址](https://younglina.top/china)
## 预览  
<div align='center'>
  <h4>首页</h4>
  <img src="https://raw.githubusercontent.com/Younglina/images/master/home.png" alt="首页"  width='200'>

  <h4 style="margin-top: 20px">详情页</h4>
  <img src="https://raw.githubusercontent.com/Younglina/images/master/detail.png" alt="详情页"  width='200'>

  <h4 style="margin-top: 20px">卡片页</h4>
  <img src="https://raw.githubusercontent.com/Younglina/images/master/list.png" alt="卡片页"  width='200'>

  <h4 style="margin-top: 20px">登录注册页</h4>
  <img src="https://raw.githubusercontent.com/Younglina/images/master/sign.png" alt="登录注册页"  width='200'>

  <h4 style="margin-top: 20px">我的页</h4>
  <img src="https://raw.githubusercontent.com/Younglina/images/master/my.png" alt="我的页"  width='200'>
</div>

## 开发
### vite创建项目
[相关链接](https://cn.vitejs.dev/guide/)  
```
pnpm vite create jdz

cd jdz

pnpm install
pnpm run dev
```
然后按照提示操作即可，我没用ts  

`vite.config.js`配置别名
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
```

### 使用vue-router
[相关链接](https://router.vuejs.org/zh/installation.html)  
安装
```
pnpm install vue-router@4
```
创建router，新建src/router/index.js
```
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router

```
引入`main.js`
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
const app = createApp(App)

app.use(router)
app.mount('#app')
```

使用
```
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const {data} = route.query
router.push({path:'/page',query:{data:1}})
```

### 使用vant
[相关链接](http://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-fa-er.-an-xu-yin-ru-zu-jian-yang-shi)  
安装
```
pnpm i vant
```
按需引入  
1. 安装插件
```
pnpm add unplugin-vue-components -D
```
2. 配置插件
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vant按需引入
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
})
```
完成以上两步，就可以直接在模板中使用 Vant 组件了  
使用
```
<template>
  <van-button type="primary" @click="alert(1)">button</van-button>
</template>
```

### 使用pinia
[相关链接](https://pinia.web3doc.top/getting-started.html)  
安装
```
pnpm install pinia
```
创建`src/store/index.js`，单独的`state`基本够用了
```
import { defineStore } from 'pinia'

export const useStore = defineStore('store', 
  state: () => {
    return {
      userInfo: null,
      allImages: null,
      scenic: [],
      food: [],
      play: [],
      porcelain: [],
    }
  })
```

引入`main.js`
```
import { createPinia } from 'pinia'

app.use(createPinia())
```

使用
```
<script setup>
import { useStore, storeToRefs } from '@/store'
import { computed } from 'vue'

const store = useStore()

// 可以直接使用
cosnt scenic = store.scenic

// 转成ref
const { scenic, food, porcelain } = storeToRefs(store)

// 使用computed
const isLike = computed(() => store.userInfo ? store.userInfo.likes : false)
</script>
```

### 使用leancloud和腾讯云存储
因为不想单独搞一个后端服务，所以JSON数据的CURD都放在leancloud，图片相关的都存在腾讯云，具体可以看我的[另一篇文章](https://juejin.cn/post/7203569814181838908#heading-10)