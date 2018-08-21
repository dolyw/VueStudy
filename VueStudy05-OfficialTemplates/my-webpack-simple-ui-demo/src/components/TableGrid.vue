<template>
    <div>
        <add-or-update :col-name-grid="colNameGrid"></add-or-update>

        <el-table :data="filteredData" border style="width: 100%">
          <el-table-column type="index" align="center" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="200"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center" width="200"></el-table-column>
          <el-table-column prop="age" label="年龄" align="center" width="200"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="findUserByName(scope.row.name)" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" type="danger" @click="delUser(scope.$index)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import AddOrUpdate from './AddOrUpdate.vue'

export default {
  name: 'TableGrid',
  props: {
    searchStrGrid: String,
    colNameGrid: Array,
    tableDataGrid: Array
  },
  components: {
    AddOrUpdate
  },
  filters: {
    // 首字母转大写
    capitalize: function (value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    // 字符查找过滤
    filteredData: function () {
      var self = this
      return this.tableDataGrid.filter(function (user) {
        return user.name.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.sex.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.age.toString().toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    delUser: function (index) {
      this.tableDataGrid.splice(index, 1)
      this.$message({
        showClose: true,
        message: '删除成功'
      })
    },
    addOrUpdate: function (user) {
      for (var index = 0, len = this.tableDataGrid.length; index < len; index++) {
        if (this.tableDataGrid[index].name === user.name) {
          // 用for不用一个个写
          for (var col in user) {
            this.tableDataGrid[index][col] = user[col]
          }
          // 使用下面这个方法对象替换了，但是属性还是没替换，重新加载表格就好了
          // this.tableDataGrid[index] = Vue.copyProperty(user);
          return
        }
      }
      this.tableDataGrid.push(user)
    },
    findUserByName: function (name) {
      var tableDataGrid = this.tableDataGrid
      for (var index = 0, len = this.tableDataGrid.length; index < len; index++) {
        if (tableDataGrid[index].name === name) {
          this.$root.eventHub.$emit('findUserByName', tableDataGrid[index])
        }
      }
    },
    handleEdit: function (index, row) {
      this.$message(index + '=' + row.name)
    }
  },
  // 组件创建时启动监听
  created: function () {
    this.$root.eventHub.$on('addOrUpdate', this.addOrUpdate)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('addOrUpdate', this.addOrUpdate)
  }
}
</script>
<style>
.el-table th.gutter {
    display: table-cell !important;
}
</style>
