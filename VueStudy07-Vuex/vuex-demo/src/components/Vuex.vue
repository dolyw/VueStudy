<template>
  <div>
    <p>当前值：{{ this.$store.state.count }}</p>
    <el-row>
      <el-col :span="24">
        <el-button @click="increment">增加</el-button>
        <el-button @click="reduced">减少</el-button><br/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button @click="incrementAsync">异步增加</el-button>
        <el-button @click="reducedAsync">异步减少</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    incrementAsync () {
      this.$store.dispatch('incrementAsync')
    },
    reduced () {
      this.$store.commit('reduced')
    },
    reducedAsync () {
      this.$store.dispatch('reducedAsync')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 15px
}
</style>
