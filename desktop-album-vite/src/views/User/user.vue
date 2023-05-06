<template>
  <div>用户详情页面</div>
  <div>用户名：{{ nickname }}</div>
  <div>头像：{{ avatar }}</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { getMyselfInfoApi } from '@/request/api'

const state = reactive<{
  nickname: string
  avatar: string
}>({
  nickname: '',
  avatar: '',
})

const { nickname, avatar } = toRefs(state)

// 通过token获取登录用户基本信息
const getMyselfInfo = async () => {
  const data = await getMyselfInfoApi()
  if (data.status !== 200) return ElMessage.error('获取用户信息错误！')

  nickname.value = data.data.nickname
  avatar.value = data.data.avatar
}
getMyselfInfo()
</script>

<style lang="less" scoped></style>
