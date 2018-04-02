<template>
  <mu-paper>
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
        <mu-bottom-nav-item href="#/" value="movies" title="充值" icon="home"/>
        <mu-bottom-nav-item href="#/about" value="music" title="订单详情" icon="view_quilt"/>
        <mu-bottom-nav-item href="#/contact" value="books" title="关于我" icon="contact_phone"/>
      </mu-bottom-nav>
    </mu-paper>
</template>



<script>
export default {
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>


<style scoped>

</style>