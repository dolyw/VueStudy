<template>
  <div>
    <!-- {{ msg }} -->
    <el-row>
      <el-col :span="24">
        <router-link to="/home/news"><el-button type="success" plain>News</el-button></router-link>
        <router-link to="/home/message"><el-button type="success" plain>Message</el-button></router-link><br/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Home Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
