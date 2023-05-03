import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'

const Home = () => import('@/views/Home/home.vue')
const Other = () => import('@/views/Other/other.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  { path: '/home', name: 'Home', component: Home },
  { path: '/other', name: 'Other', component: Other },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 封装路由初始化方法
export const initRouter = (app: App<Element>) => {
  app.use(router)
}
