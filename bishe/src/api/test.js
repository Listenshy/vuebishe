//导入request
import request from "@/utils/request.js";
//请求数据db.json
// 写法一,不可以传值，只可以打印
// request.get('http://localhost:8888/db.json').then(res=>{
//     console.log('测试结果',res.data)
// }).catch(err=>{
//     console.log('Err',err)
// })

//写法二，不可以传值，只可以打印
const BASE_URL = "";
// request.get(BASE_URL+'/db.json').then(res=>{
//     console.log('测试结果',res.data)
// }).catch(err=>{
//     console.log('Err',err)
// })

//写法三,不可以传值，只可以打印
// request({
//     url: 'http://localhost:8888/db.json',
//     method: "get"
// }).then((res) => {
//     console.log("测试结果3", res.data);

// }).catch((err) => {
//     console.log(err);
// });

// 写法四,推荐
//默认导出
export default {
  getList() {
    let req = request({
      url: BASE_URL + "/db.json",
      method: "get",
    });
    return req;
  },
};
