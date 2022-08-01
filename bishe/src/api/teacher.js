// 引入axios请求
import request from "@/utils/request";
// 默认导出getList查询到的方法
export default {
  getList() {
    return request({
      url: "/teacher/list",
      method: "get",
    });
  },

  search(page, size, searchMap) {
    return request({
      url: "/teacher/list",
      method: "post",
      // 和后台的数据传输
      data: {
        page,
        size,
        searchMap,
      },
    });
  },

  add(pojo) {
    return request({
      url: "/teacher",
      method: "post",
      data: pojo,
    });
  },

  // 拿到ID
  getId(id) {
    return request({
      url: "/teacher?id=" + id,
      method: "get",
    });
  },

  //
  update(pojo) {
    return request({
      url: "/teacher",
      method: "put",
      data: pojo,
    });
  },
  delete(id) {
    return request({
      url: "/teacher",
      method: "delete",
      data: {
        id,
      },
    });
  },
};
