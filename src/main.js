import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Quasar,
  Notify
} from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.scss'
import router from './router'
import App from './App.vue'

const app = createApp(App) // 生成 Vue 实例 app

const pinia = createPinia();

app.use(router)
app.use(pinia)

app.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: {
      position: 'top'
    }
  }
})
app.mount('#app')
