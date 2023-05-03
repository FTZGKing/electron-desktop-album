import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
  resolve: {
    // 路径别名
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    // 热更新
    hmr: true,
    // 打开端口
    port: 6012,
    // 是否开启https服务
    https: false,
    // // 代理
    proxy: {
      '/api1': {
        target: 'http://127.0.0.1:6011',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ''),
      },
    },
  },
})
