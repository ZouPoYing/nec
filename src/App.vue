<template>
  <div id="app">
    <main-nav-bar/>
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import MainNavBar from "./components/content/mainNavBar/MainNavBar";
  import TabBar from "./components/common/tabbar/TabBar";
  export default {
    name: 'App',
    components: {
      MainNavBar,
      TabBar
    }
  }
</script>

<style>
  @import "./assets/css/base.css";

  #app {
    position: relative;
  }
</style>
