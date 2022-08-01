<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body,
html {
  margin: 0px auto;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
[v-clock] {
  display: none;
}
</style>
