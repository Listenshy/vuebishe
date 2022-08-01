import request from "@/utils/request";

export default {
  getPass(msg, password) {
    return request({
      url: "/user/pwd",
      method: "post",
      data: msg,
    });
  },

  update(msg) {
    return request({
      url: "/user/pwd",
      method: "put",
      data: msg,
    });
  },
};
