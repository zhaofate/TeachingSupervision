import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.scss'
import router from './router'
import App from './App.vue'

const app = createApp(App) // 生成 Vue 实例 app
app.use(router)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
app.mount('#app')
