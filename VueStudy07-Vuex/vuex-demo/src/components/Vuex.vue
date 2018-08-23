<template>
  <div>
    <p>当前值：{{ count }}</p>
    <el-button @click="increment">增加</el-button>
    <el-button @click="reduced">减少</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count++
    },
    reduced () {
      this.count--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
