<template>
    <div>
      <el-row>
        <el-col :span="20">
          <el-button @click="addUser(true)">新增</el-button>
          </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchStr"></el-input>
        </el-col>
      </el-row>
      <br/>
      <table-grid :search-str-grid="searchStr"></table-grid>
    </div>
</template>
<script>
import TableGrid from './TableGrid.vue'

export default {
  name: 'App',
  data () {
    return {
      searchStr: ''
    }
  },
  components: {
    TableGrid
  },
  methods: {
    addUser: function (flag) {
      this.$root.eventHub.$emit('addUser', flag)
    }
  }
}
</script>
