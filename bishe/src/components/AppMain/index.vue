<template>
  <div class="main">
    <linka v-show="$route.path !== '/home'"></linka>
    <router-view></router-view>
  </div>
</template>

<script>
import linka from "./link.vue";
export default {
  components: {
    linka,
  },
};
</script>

<style scoped>
.main {
  width: 84%;
  height: 100%;
  position: absolute;
  top: 50px;
  left: 16%;
  padding: 10px;
  /* background-color:rgb(52, 52, 61); */
  overflow: hidden;

  /* background-image: url("../../assets/微信图片_20210930193526.jpg"); */
  background-image: url("../../assets/5882b2b7d0a20cf4109e896778094b36acaf997f.jpg");
  background-size: 100% 100%;
}
</style>
