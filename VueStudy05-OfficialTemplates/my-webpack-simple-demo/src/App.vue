<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <hello-world></hello-world> -->
    <table-grid :col-name-grid="colName" :table-data-grid="tableData"></table-grid>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TableGrid from './components/TableGrid.vue'

export default {
  name: 'App',
  data () {
    return {
      colName: [{
        name: 'name',
        type: 'input',
        default: ''
      }, {
        name: 'sex',
        type: 'select',
        default: ['男', '女']
      }, {
        name: 'age',
        type: 'input',
        default: 0
      }],
      tableData: [{
        name: 'Jack',
        sex: '男',
        age: 32
      }, {
        name: '王明',
        sex: '男',
        age: 43
      }, {
        name: 'Lili',
        sex: '女',
        age: 24
      }, {
        name: '李玲',
        sex: '女',
        age: 19
      }]
    }
  },
  components: {
    HelloWorld,
    TableGrid
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 10px;
}
</style>
