import NProgress from "nprogress"; //进度条
import "nprogress/nprogress.css"; //引入进度条样式
import { createRouter, createWebHistory } from "vue-router";

//路由信息是一个对象数组
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Layout",
    component: ()=> import('../page/Layout.vue'),
    children: [{
      path: "/login",
      name: "Login",
      component: ()=> import('../components/layout/Login.vue'),
    },
    {
      path: "/login/register",
      name: "Register",
      component: ()=> import('../components/layout/Register.vue'),
    }]
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: ()=> import('../page/Teacher.vue'),
  },
  {
    path: "/leader",
    name: "Leader",
    component: ()=> import('../page/Leader.vue'),
  },
  {
    path: "/supervision",
    name: "Supervision",
    component: ()=> import('../page/Supervision.vue'),
  },
  {
    path: "/home",
    name: "Home",
    component: ()=> import('../components/Home.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(), //路由模式
  routes, //存放路由信息
});
// 页面路由刚开始切换的时候
router.beforeEach((_to, _from, next) => {
  NProgress.start(); //进度条开始
  next();
});
// 页面路由切换完毕的时候
router.afterEach(() => {
  NProgress.done(); //进度条结束
});

//导出
export default router;
