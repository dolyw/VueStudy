<template>
  <div>
    News{{ this.$route.params.newsId }}{{ this.$route.query.newsId }}
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to NewsChild Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
