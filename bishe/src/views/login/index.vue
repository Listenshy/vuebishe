<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="childForm"
      label-width="100px"
      class="login-form"
    >
      <h2 class="title-zc">登录页面</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('childForm')"
          >提交</el-button
        >
        <a href="#/register">没有账号，点击注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          //默认校验
          { required: true, message: "请输入账号名字", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(typeof this.form.username, typeof this.form.password);
          console.log(this.form.username, this.form.password);
          login(this.form.username, this.form.password)
            .then((res) => {
              let resArr = res.data;

              console.log(resArr);
              // console.log("访问成功");

              this.$message({
                showClose: true,
                message: resArr.message,
                type: "success",
              });

              if (resArr.flag) {
                getUserInfo(resArr.data.token)
                  .then((res) => {
                    // console.log("获取用户信息");
                    // console.log(res);

                    if (res.data.flag) {
                      localStorage.setItem(
                        "sms-user",
                        JSON.stringify(res.data.data)
                      );
                      localStorage.setItem("sms-token", resArr.data.token);
                      this.$router.push("/");
                      // this.$router.push({ name: "Layout" });
                      // console.log(this);
                      // 路由跳转
                    }
                  })
                  .catch((err) => {
                    // console.log("错误", err);
                  });
              }
            })

            .catch((err) => {
              // console.log("失败", err);
            });
        } else {
          this.$message({
            showClose: true,
            message: "验证不通过",
            type: "error",
          });
          return false;
        }
      });
    },
    //   login(this.form.username, this.form.password)
    //     .then((res) => {
    //       console.log("成功访问");

    //       this.$message({
    //         showClose: true,
    //         message: res.data.message,
    //         type: "success",
    //       });
    //       if (res.data.flag) {
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //     });
  },
};
</script>

<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: url("../../assets/微信图片_20210930193526.jpg"); */
  background-size: 100% 100%;
}
.login-form {
  width: 400px;
  margin: 100px auto;
  background-color: rgba(113, 187, 221, 0.7);
  padding: 30px;
  border-radius: 20px;
  color: #fff;
}
.title-zc {
  text-align: center;
}
</style>
