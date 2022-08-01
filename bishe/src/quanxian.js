// 路由守卫
// 引入路由
import router from "./router/index.js";
// 引入getUserInfo,进行本地存储数据,比如防止门牌号忘的纸条
import { getUserInfo } from "../src/api/login.js";
// to即将进入的目标路由，from当前的，next是去往的路由，是一个方法
router.beforeEach((to, from, next) => {
  // token使用户的唯一标识，比如家里钥匙
  let token = localStorage.getItem("sms-token");

  if (!token) {
    if (to.path == "/login") {
      next();
    } else if (to.path == "/register") {
      next();
    } else {
      next({ path: "/login" });
    }
    // 如果有token
  } else {
    if (to.path == "/login") {
      next();
    } else if (to.path == "/register") {
      next();
    } else {
      // 拿到本地是不是有用户的数据，比如门牌号
      let userinfo = localStorage.getItem("sms-user");
      // 有的话顺利跳转
      if (userinfo) {
        next();
        // 没有的话，将sms-user进行存储到本地之后顺利跳转
      } else {
        getUserInfo(token).then((res) => {
          let resArr = res.data;
          if (resArr.flag) {
            localStorage.setItem("sms-user", JSON.stringify(resArr.data));
            next();
            // token的值不对的话，不能跳转，默认回到'/login'
          } else {
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
