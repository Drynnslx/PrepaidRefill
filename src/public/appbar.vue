<template>
  <div>
    <mu-appbar title="手机话费充值">
      <mu-icon-button icon="menu" slot="left" @click="toggle(true)"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item href="#/" title="充值"/>
        <mu-menu-item href="#/about" title="订单详情"/>
        <mu-menu-item href="#/contact" title="关于我"/>
      </mu-icon-menu>
    </mu-appbar>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="" disabled>
          <!-- <mu-avatar  slot="left" src="/static/img/imgs-1.jpg" :size="40"/> -->
        </mu-list-item>
        <mu-list-item title="盛丽霞"/>
        <mu-list-item title="15555192560"/>
        <mu-list-item title="Demonbutterfly@126.com"/>
        <mu-list-item v-if="!docked" @click.native="open = false" title="Close"/>
      </mu-list>
    </mu-drawer>
  </div>
  
</template>



<script>
export default {
  data () {
    return {
      open: false,
      docked: true
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>


<style scoped>
.mu-drawer{
  width: 14rem;
}
</style>