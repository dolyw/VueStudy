<template>
    <div>
        <add-or-update></add-or-update>

        <el-table :data="filteredData" border style="width: 100%">
          <el-table-column type="index" align="center" width="80"></el-table-column>
          <!-- <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column> -->
          <el-table-column prop="account" label="帐号" align="center" width="200"></el-table-column>
          <el-table-column prop="password" label="密码" align="center" width="200"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center" width="200"></el-table-column>
          <el-table-column prop="regTime" label="注册日期" align="center" width="300" :formatter="dateFormat"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="findUserById(scope.row.id)" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" type="danger" @click="delUser(scope.row.id)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div align="center" style="margin-top:10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import AddOrUpdate from './AddOrUpdate.vue'

export default {
  name: 'TableGrid',
  data () {
    return {
      // Table数据
      tableData: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 5,
      // 总条数
      totalCount: 25
    }
  },
  props: {
    searchStrGrid: String
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
      return this.tableData.filter(function (user) {
        return user.account.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.password.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.username.toString().toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    login: function (loginModel) {
      console.log(loginModel)
      this.$axios.post('user/login', loginModel)
        .then(response => {
          console.log(response)
          // this.cookies.set('accessToken', response.data.data, { expires: 1, path: '/' })
          this.$root.loginStatus = false
          this.getUsers(this.currentPage, this.pageSize)
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
    getUsers: function (pageNum, pageSize) {
      this.$axios.get('user', {
        params: {
          page: pageNum,
          rows: pageSize
        }
      })
        .then(response => {
          console.log(response.data.data.data)
          console.log(response.data.data.count)
          this.$set(this, 'tableData', response.data.data.data)
          this.$set(this, 'totalCount', response.data.data.count)
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
      this.$axios.delete(`user/${id}`)
        .then(response => {
          console.log(response.data.code)
          this.getUsers(this.currentPage, this.pageSize)
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
    addOrUpdate: function (user) {
      if (user.id != null && typeof (user.id) !== 'undefined') {
        this.$axios.put('user', user)
          .then(response => {
            console.log(response.data.code)
            this.getUsers(this.currentPage, this.pageSize)
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
      } else {
        this.$axios.post('user', user)
          .then(response => {
            console.log(response.data.code)
            this.getUsers(this.currentPage, this.pageSize)
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
      }
    },
    findUserById: function (id) {
      this.$axios.get(`user/${id}`)
        .then(response => {
          console.log(response.data.code)
          console.log(response.data.data)
          console.log(this.cookies.get('accessToken'))
          // this.$refs.gridTable.addOrUpdate.$set(this, 'newUser', response.data.data);
          // this.$set(this.$refs.gridTable.$refs.addOrUpdate, 'newUser', response.data.data)
          this.$root.eventHub.$emit('findUserById', response.data.data)
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
    // 每页条数改变
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize
      this.getUsers(this.currentPage, this.pageSize)
    },
    // 当前页数改变
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getUsers(this.currentPage, this.pageSize)
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
    this.getUsers(this.currentPage, this.pageSize)
  },
  // 组件创建时启动监听
  created: function () {
    this.$root.eventHub.$on('addOrUpdate', this.addOrUpdate)
    this.$root.eventHub.$on('login', this.login)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('addOrUpdate', this.addOrUpdate)
    this.$root.eventHub.$off('login', this.login)
  }
}
</script>
<style>
.el-table th.gutter {
    display: table-cell !important;
}
</style>
