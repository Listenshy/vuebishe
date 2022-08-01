import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/register/index.vue";
import login from "../views/login/index.vue";
import Layout from "../components/Layout.vue";

// 引入子路由
import home from "../views/home/index.vue";
import teacher from "../views/teacher/index.vue";
import student from "../views/student/index.vue";
import tongji from '../views/tongji/index.vue'
Vue.use(VueRouter);

const routes = [
  {
    // 注册页面
    path: "/register",
    component: Register,
    name: "register",
  },
  {
    // 登录页面
    path: "/login",
    component: login,
    name: "login",
  },
  {
    // 管理页面
    path: "/",
    component: Layout,
    name: "Layout",
    // 重定向
    redirect: "/home",

    // 创建子路由
    children: [
      {
        path: "/home",
        component: home,
        meta: { title: "首页" },
      },
    ],
  },

  {
    path: "/teacher",
    component: Layout,
    name: "teacher",

    children: [
      {
        path: "/",
        component: teacher,

        meta: { title: "教师管理" },
      },
    ],
  },

  {
    path: "/student",
    component: Layout,
    name: "student",

    children: [
      {
        path: "/",
        component: student,

        meta: { title: "学生管理" },
      },
    ],
  },

  {
    path: "/tongji",
    component: Layout,
    name: "tongji",

    children: [
      {
        path: "/",
        component: tongji,

        meta: { title: "创新统计" },
      },
    ],
  },
];

// 使用路由
const router = new VueRouter({
  routes,
  // mode:"history"//更改路由的hash
});

// 路由守卫也可以写下这里
// // 引入getUserInfo,进行本地存储数据,比如防止忘得纸条
// import {getUserInfo} from "../src/api/login.js"
// router.beforeEach((to,from,next)=>{
//   // token使用户的唯一标识，比如家里钥匙
//   let token=localStorage.getItem('sms-token')

//   if(!token){
//       if(to.path=="/login"){
//           next()
//       }else if(to.path=="/register"){
//           next()
//       }else{
//           next({path:'/login'})
//       }
//       // 如果有token
//   }else{
//       if(to.path=="/login"){
//           next()
//       }else if(to.path=="/register"){
//           next()
//       }else{
//           // 拿到本地是不是有用户的数据，比如门牌号
//           let userinfo=localStorage.getItem('sms-user')
//           // 有的话顺利跳转
//           if(userinfo){
//               next()
//           }else{
//               getUserInfo(token).then(res=>{
//                   let resArr=res.data
//                   if(resArr.flag){
//                       localStorage.setItem("sms-user",JSON.stringify(resArr.data))
//                       next()
//                   }else{
//                       next({path:'/login'})
//                   }
//               })
//           }
//       }
//   }
// })

export default router;
