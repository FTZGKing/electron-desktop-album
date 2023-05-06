<template>
  <div class="headerContainer">
    <div class="partLeft" title="首页" @click="jumperRouter('/home')">
      GKing Album
    </div>

    <div class="partRight">
      <el-icon size="20" title="后退" @click="historyRouter(-1)">
        <ArrowLeft />
      </el-icon>
      <el-icon size="20" title="前进" @click="historyRouter(1)">
        <ArrowRight />
      </el-icon>

      <div>|</div>

      <div>{{ nickname }}</div>
      <div class="avatar" title="用户详情" @click="jumperRouter('/user')">
        <el-avatar :size="48" :src="avatar" />
      </div>

      <el-dropdown trigger="click" @command="handleCommand">
        <el-icon size="22" title="功能栏">
          <Operation />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <el-icon color="red" size="20"><WarningFilled /></el-icon>
              <b>退出登录</b>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div>|</div>

      <el-icon size="24" title="最小化" @click="minWindow">
        <Minus />
      </el-icon>
      <el-icon size="20" title="全屏" @click="toggleMaxWindow">
        <FullScreen />
      </el-icon>
      <el-icon size="24" title="退出" @click="closeWindow">
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  Minus,
  FullScreen,
  Close,
  Operation,
  ArrowLeft,
  ArrowRight,
  WarningFilled,
} from '@element-plus/icons-vue'
import { getMyselfInfoApi } from '@/request/api'
import { useLoginStore } from '@/store/store'

const state = reactive<{
  nickname: string
  avatar: string
}>({
  nickname: '2333',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
})

const loginStore = useLoginStore()
const { status: loginStatus } = storeToRefs(loginStore)
const router = useRouter()
const { nickname, avatar } = toRefs(state)

watch(loginStatus, () => {
  if (loginStatus.value) getMyselfInfo()
  else {
    nickname.value = '233333'
    avatar.value =
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
})

// 通过token获取登录用户基本信息
const getMyselfInfo = async () => {
  const data = await getMyselfInfoApi()
  if (data.status !== 200) {
    loginStore.setStatus(false)
    jumperRouter('/login')
    return
  }

  nickname.value = data.data.nickname
  avatar.value = data.data.avatar
  loginStore.setStatus(true)
  router.push('/home')
}
getMyselfInfo()

// 最小化窗口
const minWindow = () => (window as any).controlWindow.minWindow()
// 切换最大化窗口
const toggleMaxWindow = () => (window as any).controlWindow.maxWindow()
// 关闭窗口
const closeWindow = () => (window as any).controlWindow.closeWindow()

// 路由跳转
const jumperRouter = (path: string) => router.push(path)
// 路由的前进后退
const historyRouter = (num: number) => router.go(num)

// 下拉菜单项点击事件
const handleCommand = (command: string | number) => {
  const obj: { [key: string | number]: Function } = {
    logout: () => logout(),
  }
  const func: Function = obj[command]
  func()
}
// 退出登录
const logout = () => {
  window.localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
@fontstyle: comic Sans MS, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: calc(100vw - 32px);
  font-family: @fontstyle;
  font-weight: bold;
  padding: 6px 16px;
  -webkit-app-region: drag;

  > .partLeft {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  > .partRight {
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;

    > * {
      margin: 0 8px;
    }
    > .avatar {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .el-icon {
      cursor: pointer;
      font-size: 25px;
      color: rgb(105, 105, 105);
      padding: 2px 2px;
      &:hover {
        color: black;
        background-color: #dbeedb;
      }
    }
  }
}
</style>
