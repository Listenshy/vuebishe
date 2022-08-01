<template>
  <div class="li">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item id="line" :to="{ path: $route.path }">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  /* width: 84%; */
  box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.2);
}

/* .el-breadcrumb__inner {
  cursor: pointer !important;
} */
.el-breadcrumb__inner {
  cursor: pointer !important;
}
.li {
  margin-bottom: 10px;
}
</style>
