import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      userInfo: null,
      iLikes: [],
      counter: 0,
      scenic: [],
      food: [],
      play: []
    }
  }
})

export const getStore = () => {
  const st = useStore()
  const chinaPiniaInfo = localStorage.getItem('china-pinia-info')
  if (chinaPiniaInfo) {
    // 可以通过将其 $state 属性设置为新对象来替换 Store 的整个状态：
    st.$state = JSON.parse(chinaPiniaInfo)
  }
  // 可以通过 store 的 $subscribe() 方法查看状态及其变化
  st.$subscribe((mutations, state) => {
    // 每当它发生变化时，将整个状态持久化到本地存储
    localStorage.setItem('china-pinia-info', JSON.stringify(state))
  })
  return st
}
