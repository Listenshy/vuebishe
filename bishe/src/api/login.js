import request from "@/utils/request.js";

//不是默认导出，是普通导出
// post申请，data写在前台进行传递
export function register(username, nickname, password) {
  return request({
    //接口地址和node的接口一样
    url: "/user/register",
    method: "post",
    // 和后台的数据传输
    data: {
      username,
      nickname,
      password,
    },
  });
}
// 登录
export function login(username, password) {
  return request({
    //接口地址和node的接口一样
    url: "/user/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
}
// 用户的唯一标识
export function getUserInfo(token) {
  return request({
    //接口地址和node的接口一样
    // get请求餐朱在地址里
    url: `/user/info?token=${token}`,
    method: "get",
    // data:{
    //    token
    // }
  });
}
// 退出用户
export function logout(token) {
  return request({
    url: "/user/logout",
    method: "post",
    data: {
      token,
    },
  });
}
