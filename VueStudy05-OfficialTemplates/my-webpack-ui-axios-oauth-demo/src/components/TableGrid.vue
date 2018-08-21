<template>
    <div>
        <add-or-update></add-or-update>

        <el-table :data="filteredData" border style="width: 100%">
          <el-table-column type="index" align="center" width="80"></el-table-column>
          <!-- <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column> -->
          <el-table-column prop="account" label="帐号" align="center" width="200"></el-table-column>
          <el-table-column prop="password" label="密码" align="center" width="200"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center" width="200"></el-table-column>
          <el-table-column prop="regtime" label="注册日期" align="center" width="300"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="findUserById(scope.row.id)" icon="el-icon-edit" circle></el-button>
              <el-button size="mini" type="danger" @click="delUser(scope.row.id)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import AddOrUpdate from './AddOrUpdate.vue'

export default {
  name: 'TableGrid',
  data () {
    return {
      tableData: []
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
      // formData提交
      console.log(loginModel)
      this.$axios({
        url: 'oauth/token',
        method: 'post',
        data: loginModel,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          console.log(response)
          sessionStorage.setItem('accessToken', response.data.access_token)
          this.$root.accessToken = response.data.access_token
          this.getUsers()
          this.$message({
            showClose: true,
            message: '登录成功'
          })
        })
        .catch(error => {
          console.log(error.message)
          console.log(error.response)
          console.log(error.config)
          this.$message({
            showClose: true,
            message: '登录失败'
          })
        })
        .then(() => {
          // always executed
        })
    },
    logout: function () {
      sessionStorage.removeItem('accessToken')
      this.$root.accessToken = null
      this.$message({
        showClose: true,
        message: '注销成功'
      })
    },
    getUsers: function () {
      this.$axios.get('user')
        .then(response => {
          console.log(response)
          console.log(this)
          this.$set(this, 'tableData', response.data.data)
        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '获取数据失败'
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
          this.getUsers()
          this.$message({
            showClose: true,
            message: '删除成功'
          })
        })
        .catch(error => {
          console.log(error.message)
          console.log(error.response)
          console.log(error.config)
          if (error.response.status === 401) {
            this.$message({
              showClose: true,
              message: '请先登录'
            })
          } else {
            this.$message({
              showClose: true,
              message: '删除失败'
            })
          }
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
            this.getUsers()
          })
          .catch(error => {
            console.log(error.message)
            console.log(error.response)
            console.log(error.config)
            if (error.response.status === 401) {
              this.$message({
                showClose: true,
                message: '请先登录'
              })
            } else {
              this.$message({
                showClose: true,
                message: '更新失败'
              })
            }
          })
          .then(() => {
            // always executed
          })
      } else {
        this.$axios.post('user', user)
          .then(response => {
            console.log(response.data.code)
            this.getUsers()
          })
          .catch(error => {
            console.log(error.message)
            console.log(error.response)
            console.log(error.config)
            if (error.response.status === 401) {
              this.$message({
                showClose: true,
                message: '请先登录'
              })
            } else {
              this.$message({
                showClose: true,
                message: '添加失败'
              })
            }
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
          // this.$refs.gridTable.addOrUpdate.$set(this, 'newUser', response.data.data);
          // this.$set(this.$refs.gridTable.$refs.addOrUpdate, 'newUser', response.data.data)
          this.$root.eventHub.$emit('findUserById', response.data.data)
        })
        .catch(error => {
          console.log(error.message)
          console.log(error.response)
          console.log(error.config)
          if (error.response.status === 401) {
            this.$message({
              showClose: true,
              message: '请先登录'
            })
          } else {
            this.$message({
              showClose: true,
              message: '查询失败'
            })
          }
        })
        .then(() => {
          // always executed
        })
    },
    handleEdit: function (index, row) {
      this.$message(index + '=' + row.name)
    }
  },
  // 启动时就执行
  mounted: function () {
    // Token不为空才进行查询用户列表
    var accessToken = sessionStorage.getItem('accessToken')
    this.$root.accessToken = accessToken
    if (typeof (accessToken) !== 'undefined' && accessToken != null && accessToken !== '') {
      this.getUsers()
    }
  },
  // 组件创建时启动监听
  created: function () {
    this.$root.eventHub.$on('addOrUpdate', this.addOrUpdate)
    this.$root.eventHub.$on('login', this.login)
    this.$root.eventHub.$on('logout', this.logout)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('addOrUpdate', this.addOrUpdate)
    this.$root.eventHub.$off('login', this.login)
    this.$root.eventHub.$off('logout', this.logout)
  }
}
</script>
<style>
.el-table th.gutter {
    display: table-cell !important;
}
</style>
