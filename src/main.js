import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Quasar,
  Notify,
  LocalStorage
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

// 在此处进行配置全局的路由守卫（全局前置钩子）
// 目的是：判断当前用户中本地存储是否有token，使用户在登录之前，只能访问到/login页面，其他的页面是访问不到的。
// router.beforeEach((to, from, next) => {
//   // to 即将进入的路由
//   // from 在哪个路由进入的
//   // next 放行
//   //   console.log(to); //打印的是页面要跳转到的路由,例如：它下面的path：为"/login"
//   let token = JSON.parse(localStorage.getItem("token"));
//   if (token) {
//     //判断是否有token
//     next();
//   } else {
//     //在没有token的前提下，to下面的path是否为/login，如果不是则页面跳转到登录页面
//     if (to.path == "/login") {
//       next();
//     } else {
//       next({ path: "/login" }); //跳转页面到login页
//     }
//   }
// });

app.use(router)
app.use(pinia)

app.use(Quasar, {
  plugins: {
    Notify,
    LocalStorage,
  },
  config: {
    notify: {
      position: 'top'
    }
  }
})
app.mount('#app')
