import { defineStore, createPinia } from 'pinia'
import { ref } from 'vue'
import { App } from 'vue'

const pinia = createPinia()

// 封装路由初始化方法
export const initStore = (app: App<Element>) => {
  app.use(pinia)
}

// 在 Setup Store 中：
// ref() 就是 state 属性
// computed() 就是 getters
// function() 就是 actions

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
