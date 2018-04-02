<template>
  <div id="app">
    <v-appbar></v-appbar>

    <mu-content-block>
    <router-view/>
    </mu-content-block>

    <v-paper ref='bottompaper'></v-paper>
  </div>
</template>

<script>
import Appbar from "./public/appbar.vue";
import Paper from "./public/paper.vue";

export default {
  name: 'App',
  components:{
    'v-appbar':Appbar,
    'v-paper':Paper
  }
}
</script>

<style lang="less">
@import url('./assets/css/main.less');
</style>
