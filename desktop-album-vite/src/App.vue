<template>
  <!-- 头部栏 -->
  <Header />

  <!-- 路由展示区域 -->
  <div class="routerContainer">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<style scoped>
.routerContainer {
  -webkit-app-region: no-drag;
  height: calc(100vh - 72px);
  background-color: aliceblue;
  overflow: auto;
}
</style>
