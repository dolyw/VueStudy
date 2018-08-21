<template>
  <div>
    <!-- <table border="1">
      <tr v-for="col in colNameGrid" :key="col.name">
          <td><label>{{ col.name }}:</label></td>
          <td>
              <input v-if="col.type == 'input'" type="text" v-model="newUser[col.name]">
              <select v-if="col.type == 'select'" v-model="newUser[col.name]">
                  <option v-for="opt in col.default" :value="opt" :key="opt">{{ opt }}</option>
              </select>
          </td>
      </tr>
      <tr>
          <td colspan="2"><button @click="addOrUpdate">addOrUpdate</button></td>
      </tr>
    </table> -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="newUser">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newUser.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="newUser.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="newUser.age" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'AddOrUpdate',
  data () {
    return {
      newUser: {
        name: '',
        sex: '男',
        age: 0
      },
      formLabelWidth: '40px',
      dialogFormVisible: false
    }
  },
  props: {
    colNameGrid: Array
  },
  methods: {
    addOrUpdate: function () {
      // 在子组件中修改父组件不好的做法
      // this.$parent.tableDataGrid.push(this.newUser);
      // this.$root.tableData.push(this.newUser);
      // 使用事件派发
      if (this.newUser.name === '') {
        this.$message({
          showClose: true,
          message: '姓名不能为空'
        })
        return
      }
      var reg = /^\d*$/
      if (!reg.test(this.newUser.age)) {
        this.$message({
          showClose: true,
          message: '年龄格式有误'
        })
        return
      }
      var user = this.util.copyProperty(this.newUser)
      this.$root.eventHub.$emit('addOrUpdate', user)
      this.newUser = {name: '', sex: '男', age: 0}
      // 关闭编辑窗口
      this.dialogFormVisible = false
      this.$message({
        showClose: true,
        message: '操作成功'
      })
    },
    findUserByName: function (user) {
      // 直接赋值会将两个对象绑定
      // this.newUser = user;
      // 应该进行属性copy
      this.newUser = this.util.copyProperty(user)
      // 打开编辑窗口
      this.dialogFormVisible = true
    },
    addUser: function () {
      this.newUser = {name: '', sex: '男', age: 0}
      // 打开编辑窗口
      this.dialogFormVisible = true
    }
  },
  // 组件创建时启动监听
  created: function () {
    this.$root.eventHub.$on('findUserByName', this.findUserByName)
    this.$root.eventHub.$on('addUser', this.addUser)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('findUserByName', this.findUserByName)
    this.$root.eventHub.$off('addUser', this.addUser)
  }
}
</script>
<style>

</style>
