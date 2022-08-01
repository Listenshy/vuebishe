//引入axios
import axios from "axios";
import { Loading } from "element-ui";

const request = axios.create({
  // 发送请求，访问后台接口
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

let loading = {
  loadingInstance: null,
  open: function () {
    // console.log("加载中");
    this.loadingInstance = Loading.service({
      target: ".main",
      text: "页面加载中",
    });
  },
  close: function () {
    if (this.loadingInstance != null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
};

request.interceptors.request.use(
  function (config) {
    loading.open();
    return config;
  },
  function (error) {
    loading.close();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    loading.close();
    return response;
  },
  function (error) {
    loading.close();
    return Promise.reject(error);
  }
);

export default request;
