<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <p>路由名称：{{ this.$route.name }}</p>
    <p>当前路径：{{ this.$route.path }}</p>
    <p>params参数：{{ this.$route.params }}</p>
    <p>query参数：{{ this.$route.query }}</p>
    <!-- <p>matched参数：{{ $route.matched }}</p> -->
    <el-row>
      <el-col :span="24">
        <router-link to="/home"><el-button type="success" plain>Home</el-button></router-link>
        <router-link to="/about"><el-button type="success" plain>About</el-button></router-link>
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
  name: 'App'
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
/* .router-link-active {
  color: #000;
} */
</style>
