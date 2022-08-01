import Vue from "vue";
import App from "./App.vue";
// 引入element ui插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";

// 引入echarts
import * as echarts from "echarts";
// 引入路由守卫 2.5.2
import "./quanxian.js";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.echarts = echarts;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
