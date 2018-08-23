<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-link to="/home"><el-button type="info">Home</el-button></router-link>
    <router-link to="/about"><el-button type="info">About</el-button></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
