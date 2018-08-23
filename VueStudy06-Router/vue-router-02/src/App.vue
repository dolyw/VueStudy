<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-row>
      <el-col :span="24">
        <router-link to="/home"><el-button type="info">Home</el-button></router-link>
        <router-link to="/about"><el-button type="info">About</el-button></router-link>
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
</style>
