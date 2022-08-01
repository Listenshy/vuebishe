<template>
  <div class="layout">
    <!-- 三个上左右的页面组件 -->
    <app-header></app-header>

    <app-navbar></app-navbar>

    <app-main></app-main>
  </div>
</template>

<script>
// 引入三个上左右的页面组件文件
import AppHeader from "./AppHeader/index.vue";
import AppNavbar from "./AppNavbar/index.vue";
import AppMain from "./AppMain/index.vue";

export default {
  // 引入组件的名字
  components: {
    AppHeader,
    AppNavbar,
    AppMain,
  },
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>
