<template>
  <div>
    <el-row>
      <el-col :span="24">
        <router-link to="/home/news/newsChild/01"><el-button type="success" plain>News01</el-button></router-link>
        <router-link :to="{ name: 'newsChild', params: { newsId: '02' }}"><el-button type="success" plain>News02</el-button></router-link>
        <router-link :to="{ path: '/home/news/newsChild', query: { newsId: '03' }}"><el-button type="success" plain>News03</el-button></router-link><br/>
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
  name: 'About',
  data () {
    return {
      msg: 'Welcome to News Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
