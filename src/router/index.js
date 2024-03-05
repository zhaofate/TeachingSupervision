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
    name: "layout",
    component: ()=> import('../page/Layout.vue'),
    children: [{
      path: "/login",
      name: "login",
      component: ()=> import('../components/layout/Login.vue'),
    },
    {
      path: "/register",
      name: "register",
      // @ts-ignore
      component: ()=> import('../components/layout/Register.vue'),
    }]
  },
  {
    path: "/teacher",
    name: "teacher",
    component: ()=> import('../page/Teacher.vue'),
    children: [
      {
        path: "/assessment",
        name: "assessment",
        // @ts-ignore
        component: ()=> import('../components/teacher/Assessment.vue'),
      },
      {
        path: "/evaluate",
        name: "evaluate",
        component: ()=> import('../components/teacher/Evaluate.vue'),
      },
      {
        path: "/analysis",
        name: "analysis",
        component: ()=> import('../components/teacher/Analysis.vue'),
      },
      {
        path: "/course",
        name: "course",
        // @ts-ignore
        component: ()=> import('../components/teacher/Course.vue'),
      },
      {
        path: "/person",
        name: "person",
        // @ts-ignore
        component: ()=> import('../components/teacher/Person.vue'),
      },
      {
        path: "/message",
        name: "message",
        component: ()=> import('../components/teacher/Message.vue'),
      },
    ]
  },
  {
    path: "/leader",
    name: "leader",
    component: ()=> import('../page/Leader.vue'),
    children: [
      {
        path: "/lTeacher",
        name: "lTeacher",

        component: ()=> import('../components/leader/lTeacher.vue'),
      },
      {
        path: "/lCourse",
        name: "lCourse",
        component: ()=> import('../components/leader/lCourse.vue'),
      },      {
        path: "/lTask",
        name: "lTask",
        component: ()=> import('../components/leader/lTask.vue'),
      },      {
        path: "/word",
        name: "word",
        component: ()=> import('../components/leader/Word.vue'),
      },      {
        path: "/lPerson",
        name: "lPerson",
        component: ()=> import('../components/leader/lPerson.vue'),
      },      {
        path: "/error",
        name: "error",
        // @ts-ignore
        component: ()=> import('../components/leader/Error.vue'),
      },      {
        path: "/operate",
        name: "operate",
        // @ts-ignore
        component: ()=> import('../components/leader/Operate.vue'),
      },
    ]
  },
  {
    path: "/supervision",
    name: "supervision",
    component: ()=> import('../page/Supervision.vue'),
    children:[
      {
        path: "/teachers",
        name: "teachers",
        // @ts-ignore
        component: ()=> import('../components/supervision/Teachers.vue'),
      },
      {
        path: "/teachers",
        name: "teachers",
        // @ts-ignore
        component: ()=> import('../components/supervision/Teachers.vue'),
      },      {
        path: "/sCourse",
        name: "sCourse",
        // @ts-ignore
        component: ()=> import('../components/supervision/sCourse.vue'),
      },      {
        path: "/task",
        name: "task",
        // @ts-ignore
        component: ()=> import('../components/supervision/Task.vue'),
      },      {
        path: "/sEvaluate",
        name: "sEvaluate",
        // @ts-ignore
        component: ()=> import('../components/supervision/sEvaluate.vue'),
      },      {
        path: "/sFeedback",
        name: "sFeedback",
        // @ts-ignore
        component: ()=> import('../components/supervision/sFeedback.vue'),
      },      {
        path: "/sMessage",
        name: "sMessage",
        // @ts-ignore
        component: ()=> import('../components/supervision/sMessage.vue'),
      },      {
        path: "/sPerson",
        name: "sPerson",
        // @ts-ignore
        component: ()=> import('../components/supervision/sPerson.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(), //路由模式
  // @ts-ignore
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
