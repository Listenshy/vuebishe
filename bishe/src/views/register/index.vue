<template>
  <div class="register-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="childForm"
      label-width="100px"
      class="resgister-form"
    >
      <h2 class="title-zc">注册页面</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="form.username"></el-input>
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model.number="form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('childForm')"
          >提交</el-button
        >
        <a href="#/login">已有账号，点击登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/login.js";
export default {
  data() {
    // 自定义密码校验
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.childForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== this.form.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      }
    };

    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [
          //默认校验
          { required: true, message: "请输入注册账号", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请输入注册昵称", trigger: "blur" },
        ],
        password: [
          //validator默认的,自定义校验
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 在login.js 中常见的方法，实参为三个参数
          register(this.form.username, this.form.nickname, this.form.password)
            .then((res) => {
              // console.log(res);
              // console.log("访问成功");
              //   如果状态码为true则可以注册，访问登录地址
              if (res.data.flag) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success",
                });

                this.$router.push("/login");
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch((res) => {
              // console.log("失败");
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error",
              });
            });
        } else {
          this.$message({
            showClose: true,
            // message: res.data.message,
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-image: url("../../assets/微信图片_20210510224118.jpg"); */
  background-size: 100% 100%;
}
.resgister-form {
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
