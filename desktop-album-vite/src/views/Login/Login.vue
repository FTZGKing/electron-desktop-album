<template>
  <div class="loginContainer">
    <h3 v-if="registerAccount">注册账号</h3>
    <el-form
      v-if="registerAccount"
      label-position="right"
      label-width="50px"
      :model="registerForm"
      style="min-width: 360px"
    >
      <el-form-item label="账号">
        <el-input v-model="registerForm.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerForm.password" type="password" />
      </el-form-item>
      <el-form-item label="私钥">
        <el-input v-model="registerForm.secretKey" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button color="#626aef" plain @click="register">
          注册账号
        </el-button>
      </el-form-item>
      <el-form-item>
        <div class="toggleForm">
          <span @click="toggleForm(false)">已有账号？立即登录</span>
        </div>
      </el-form-item>
    </el-form>

    <h3 v-if="!verifyAccount" v-show="!registerAccount">验证账号</h3>
    <el-form
      v-if="!verifyAccount"
      v-show="!registerAccount"
      label-position="right"
      label-width="50px"
      :model="verifyForm"
      style="max-width: 460px"
    >
      <el-form-item label="账号">
        <el-input v-model="verifyForm.account" />
      </el-form-item>
      <el-form-item label="私钥">
        <el-input v-model="verifyForm.secretKey" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button color="#626aef" plain @click="verify"> 验证账号 </el-button>
      </el-form-item>
      <el-form-item>
        <div class="toggleForm">
          <span @click="toggleForm(true)">没有账号？立即注册</span>
        </div>
      </el-form-item>
    </el-form>

    <h3 v-if="verifyAccount" v-show="!registerAccount">登录</h3>
    <el-form
      v-if="verifyAccount"
      v-show="!registerAccount"
      label-position="right"
      label-width="60px"
      :model="loginForm"
      style="max-width: 460px"
    >
      <el-form-item label="账号：">
        <el-input v-model="loginForm.account" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="loginForm.verifyCode" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button color="#626aef" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerApi, verifyApi, loginApi } from '@/request/api'
import { useLoginStore } from '@/store/store'

const loginStore = useLoginStore()
// 路由
const router = useRouter()
// 是否登录账号或者注册账号
const registerAccount = ref<Boolean>(false)
// 是否验证了账号
const verifyAccount = ref<Boolean>(false)

// 注册表单
const registerForm = reactive<registerAccountItf>({
  account: '',
  password: '',
  secretKey: '',
})
// 验证表单
const verifyForm = reactive<verifyAccountItf>({ account: '', secretKey: '' })
// 登录表单
const loginForm = reactive<loginAccountItf>({
  account: '',
  password: '',
  verifyCode: '',
})

// 切换登录与注册表单
const toggleForm = (val: boolean) => (registerAccount.value = val)

// 注册
const register = async () => {
  const { account, password, secretKey } = registerForm
  if (!account || !password || !secretKey)
    return ElMessage.warning('请将信息补全！')

  const data = await registerApi(account, password, secretKey)
  if (data.status !== 200)
    return ElMessage.error('注册账号失败！' + data.message)

  ElMessage.success('注册成功！')
}

// 验证账号
const verify = async () => {
  const { account, secretKey } = verifyForm
  if (!account || !secretKey) return ElMessage.warning('请将信息补充完整！')

  const data = await verifyApi(account, secretKey)
  if (data.status !== 200)
    return ElMessage.error('验证账号失败！', data.message)

  verifyAccount.value = true
  const verify = data.verify
  ElNotification({
    title: '验证账号成功！',
    message: `验证码：${verify}，验证码有效期为60s!`,
    type: 'success',
    duration: 0,
  })
}

// 登录
const login = async () => {
  const { account, password, verifyCode } = loginForm
  if (!account || !password || !verifyCode)
    return ElMessage.warning('请将信息补充完整！')

  const data = await loginApi(account, password, verifyCode)
  if (data.status !== 200) {
    ElMessage.error('登录失败！', data.message)
    verifyAccount.value = false
    loginStore.setStatus(false)
  }

  loginStore.setStatus(true)
  window.localStorage.setItem('token', data.token)
  ElMessage.success('登录成功！')
  router.push('/homePage')
}
</script>

<style lang="less" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-app-region: no-drag;
}

.el-button {
  width: 100%;
}
.toggleForm {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  > span {
    cursor: pointer;
    color: rgb(115, 59, 213);
    &:hover {
      color: rgb(107, 29, 241);
      font-weight: bold;
    }
  }
}
</style>
