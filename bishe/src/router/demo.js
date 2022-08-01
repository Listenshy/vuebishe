import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/register/index.vue";
import login from "../views/login/index.vue";

// 引入子路由
import home from "../views/home/index.vue";

Vue.use(VueRouter);

const User = {
  template: "<div>User</div>",
};

const router = new VueRouter({
  routes: [
    {
      path: "/register",
      components: Register,
      name: "register",
      children: [
        {
          path: "/home",
          components: home,
          meta: { title: "首页" },
        },
      ],
    },

    {
      path: "/user:id",
      component: User,
    },

    {
      path: "/",
      components: home,
      name: "Home",
    },

    {
      path: "/login",
      components: login,
      name: "login",
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("sms-token");
        if (!token) {
          if (to.path == "/login") {
            next();
          } else if (to.path == "/register") {
            next();
          } else {
            next({ path: "/login" });
          }
        }
      },
    },
  ],
});

export default router;
