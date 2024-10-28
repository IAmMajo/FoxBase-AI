import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Spline from 'vue3-spline'

const app = createApp(App)

app.use(router)

app.mount('#app')
