import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router/router'
import { initStore } from './store/store'
import './assets/base.less'

const app = createApp(App)

initRouter(app)
initStore(app)
app.mount('#app')
