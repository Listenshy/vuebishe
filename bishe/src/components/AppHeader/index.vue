<template>
  <div class="header">
    <a href="#">
      <img src="@/assets/logo.png" class="logo" alt="" />
      <span class="company">大学生创新创业管理系统</span>
    </a>

    <!-- element ui 官网复制 -->
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ nickname }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="pwdForm" :rules="rules">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="form.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('pwdForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入请求
import { logout } from "@/api/login.js";
import pwd from "@/api/pwd.js";

export default {
  computed: {
    nickname() {
      return JSON.parse(localStorage.getItem("sms-user")).nickname;
    },
  },
  methods: {
    // element ui 官网复制handIeCommand
    handleCommand(command) {
      //   this.$message("click on item " + command);
      // 判断点击的是哪一个按钮
      if (command == "a") {
        // 修改密码具体功能
        this.dialogFormVisible = true;
      } else if (command == "b") {
        // 如果点击的是b,跳转接口
        this.out();
      }
    },
    out() {
      logout(localStorage.getItem("sms-token"))
        .then((res) => {
          // console.log("成功访问接口", res);

          let resArr = res.data;
          if (resArr.flag) {
            localStorage.removeItem("sms-token");
            localStorage.removeItem("sms-user");

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
        .catch((err) => {
          // console.log("err", err);
        });
    },
    // 提交密码确定按钮
    onSubmit(formName) {
      this.$refs[formName].validate((vali) => {
        if (vali) {
          // alert("验证通过");
          let userdata = JSON.parse(localStorage.getItem("sms-user"));
          userdata.pwd = this.form.newPassword;
          pwd.update(userdata).then((res) => {
            // console.log(res);
            if (res.data.flag) {
              this.dialogFormVisible = false;
              this.out();
            }
          });
        } else {
          alert("验证不通过");
          return false;
        }
      });
    },
    // 获取原密码
    // getPassword() {
    //   从本地存储中拿到ID转化为对象形式
    //     let userdata=JSON.parse( localStorage.getItem("sms-user"))
    //    userdata.pwd=this.form.password
    //    pwd.getPass(userdata).then(res=>{
    //      console.log(res)
    //    })
    // },
  },
  data() {
    // 双重限值
    let validatePass = (rule, value, callback) => {
      let userdata = JSON.parse(localStorage.getItem("sms-user"));
      userdata.pwd = this.form.password;
      pwd.getPass(userdata).then((res) => {
        // console.log(res);
        if (res.data.flag) {
          callback();
        } else {
          callback(new Error(res.data.message));
        }
      });
    };

    let checkPass = (rule, value, callback) => {
      if (value == this.form.newPassword) {
        callback();
      } else {
        callback(new Error("两次密码不一致"));
      }
    };

    return {
      dialogFormVisible: false,
      form: {
        password: "",
        newPassword: "",
        checkPassword: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { validator: validatePass, message: "原密码不正确", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          // { validator: validatePass, message: "原密码不正确" },
        ],
        checkPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: checkPass, trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style scoped>
.header {
  width: 102%;
  position: absolute;
  line-height: 50px;
  background-color: rgb(4, 34, 44);
  padding: 0px;
  top: 0px;
}
.logo {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  padding: 0 10px 0 50px;
}
.company {
  color: white;
}
a {
  text-decoration: none;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
  cursor: pointer;
  color: white;
}
</style>
