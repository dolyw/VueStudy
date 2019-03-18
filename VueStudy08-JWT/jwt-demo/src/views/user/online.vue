<template>
  <div class="dashboard-container">
    <!-- 查询表单 -->
    <el-form :inline="true" label-width="90px" label-suffix="：" size="small">

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="list()">查询</el-button>
      </el-form-item>

    </el-form>

    <!-- 数据表格 -->
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%">
      <el-table-column type="index" align="center" width="80"/>
      <!-- <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column> -->
      <el-table-column prop="account" label="帐号" align="center" width="200"/>
      <el-table-column prop="username" label="用户名" align="center" width="200"/>
      <el-table-column prop="regTime" label="注册时间" align="center" width="300"/>
      <el-table-column prop="loginTime" label="登录时间" align="center" width="300"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="onlineById(scope.row.id)"/>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import * as user from '@/api/user'

export default {
  name: 'List',
  data() {
    return {
      // 表格加载条控制
      tableLoading: false,
      // Table数据
      tableData: []
    }
  },
  // 启动时就执行
  mounted: function() {
    // 列表查询
    this.list()
  },
  methods: {
    // 列表查询
    list: function() {
      // 加载显示
      this.tableLoading = true
      user.online().then(response => {
        const data = response.data
        this.$set(this, 'tableData', data)
      }).catch(error => {
        console.log(error)
      }).then(() => {
        // always executed 类似finally
        this.tableLoading = false
      })
    },
    // 删除
    onlineById: function(id) {
      this.$confirm('是否确定踢出该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定删除操作
        user.onlineById(id).then(response => {
          // 刷新列表
          this.list()
          this.$message({
            type: 'success',
            message: response.msg
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
