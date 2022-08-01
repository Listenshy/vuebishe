<template>
  <div class="navbar">
    <el-menu
      :router="true"
      :default-active="msg"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/teacher">
        <i class="el-icon-user-solid"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>

      <el-menu-item index="/student">
        <i class="el-icon-edit"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>

      <!-- <el-menu-item index="/tongji">
        <i class="el-icon-edit"></i>
        <span slot="title">项目统计</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: this.$route.path,
    };
  },
};
</script>

<style scoped>
.navbar {
  position: absolute;
  width: 16%;
  height: 100%;
  top: 50px;
  left: 0px;
  background-color: rgb(158, 166, 173);
  overflow-y: hidden;
}
</style>
