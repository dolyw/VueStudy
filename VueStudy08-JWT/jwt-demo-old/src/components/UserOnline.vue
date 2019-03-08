<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" align="center" width="80"></el-table-column>
          <!-- <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column> -->
          <el-table-column prop="account" label="帐号" align="center" width="200"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center" width="200"></el-table-column>
          <el-table-column prop="regTime" label="注册日期" align="center" width="300" :formatter="dateFormat"></el-table-column>
          <el-table-column prop="loginTime" label="登录时间" align="center" width="300" :formatter="dateFormat"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delUser(scope.row.id)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'TableGrid',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    login: function (loginModel) {
      console.log(loginModel)
      this.$axios.post('user/login', loginModel)
        .then(response => {
          console.log(response)
          this.cookies.set('accessToken', response.data.data, { expires: 1, path: '/' })
          this.$root.loginStatus = false
          this.getUsers()
          this.$message({
            showClose: true,
            message: response.data.msg
          })
        })
        .catch(error => {
          console.log(error.message)
          console.log(error.response)
          console.log(error.config)
          this.$message({
            showClose: true,
            message: error.response.data.msg
          })
        })
        .then(() => {
          // always executed
        })
    },
    getUsers: function () {
      this.$axios.get('user/online')
        .then(response => {
          console.log(response)
          console.log(this)
          this.$set(this, 'tableData', response.data.data)
        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: error.response.data.msg
          })
        })
        .then(() => {
          // always executed
        })
    },
    delUser: function (id) {
      this.$axios.delete(`user/online/${id}`)
        .then(response => {
          console.log(response.data.code)
          this.getUsers()
          this.$message({
            showClose: true,
            message: response.data.msg
          })
        })
        .catch(error => {
          console.log(error.message)
          console.log(error.response)
          console.log(error.config)
          this.$message({
            showClose: true,
            message: error.response.data.msg
          })
        })
        .then(() => {
          // always executed
        })
    },
    // 时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (!date || date === '') {
        return ''
      }
      return this.moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  // 启动时就执行
  mounted: function () {
    this.getUsers()
  },
  // 组件创建时启动监听
  created: function () {
    this.$root.eventHub.$on('login', this.login)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('login', this.login)
  }
}
</script>
<style>
.el-table th.gutter {
    display: table-cell !important;
}
</style>
