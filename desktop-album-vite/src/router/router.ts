import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { useLoginStore } from '@/store/store'

const Home = () => import('@/views/Home/home.vue')
const Other = () => import('@/views/Other/other.vue')
const Login = () => import('@/views/Login/Login.vue')
const User = () => import('@/views/User/user.vue')

const noRightRoutes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/homePage', name: 'HomePage', component: Login },
]

const rightRoutes: RouteRecordRaw[] = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/other', name: 'Other', component: Other },
  { path: '/user', name: 'User', component: User },
]

let routes: RouteRecordRaw[] = noRightRoutes

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     redirect: '/login',
//   },
//   { path: '/login', name: 'Login', component: Login },
//   { path: '/home', name: 'Home', component: Home },
//   { path: '/other', name: 'Other', component: Other },
//   { path: '/user', name: 'User', component: User },
// ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!window.localStorage.getItem('token')) useLoginStore().setStatus(false)

  if (to.path === '/login' && !useLoginStore().status) {
    next()
  } else if (useLoginStore().status) {
    for (const key in rightRoutes) router.addRoute(rightRoutes[key])
    if (from.path === '/login' && to.path === '/homePhomeage') next('/home')
    else next()
  } else {
    for (const key in rightRoutes) {
      if (router.hasRoute(rightRoutes[key].name)) {
        router.removeRoute(rightRoutes[key].name)
      }
    }
    next('/login')
  }
})

// 封装路由初始化方法
export const initRouter = (app: App<Element>) => {
  app.use(router)
}
