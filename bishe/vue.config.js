module.exports = {
  devServer: {
    port: 8888, //端口号
    host: "localhost", //主机的名称
    https: false, //是否使用https协议
    open: true, //启动服务之后是否打开浏览器
    //解决跨域
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        //监测地址栏的路径
        target: process.env.VUE_APP_SERVICE_URL, //去往哪里
        changOrigin: true, //用来开启   代理服务
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
  productionSourceMap: false, //打包完成，不生成.map文件
  lintOnSave: false, //关闭语法监测
};

// 解决跨域问题
// 复制    修改复习复制后的vue.config.js
// 修改复制后的db.json
// 启动复制后的服务
// 回到原本的代码中
// 修改vue.config.js
// 修改test.js
