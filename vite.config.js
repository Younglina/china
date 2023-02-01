import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
//自适应
import postCssPxToRem from "postcss-pxtorem"
import autoprefixer from 'autoprefixer'

// vant按需引入
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/china',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  css: {
    postcss: {
      plugins: [
        // postCssPxToRem({
        //   rootValue: 16, // 1rem的大小
        //   propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        //   unitPrecision: 5,
        // }),
        autoprefixer({ // 自动添加前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8"
            //'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
})
