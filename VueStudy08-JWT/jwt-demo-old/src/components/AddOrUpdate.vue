<template>
  <div>
    <el-dialog title="用户操作" :visible.sync="dialogFormVisible">
      <el-form :model="newUser">
        <el-input type="hidden" v-model="newUser.id"></el-input>
        <el-form-item label="帐号" :label-width="formLabelWidth">
          <el-input v-model.trim="newUser.account" auto-complete="off" @keyup.enter.native="addOrUpdate"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model.trim="newUser.password" auto-complete="off" @keyup.enter.native="addOrUpdate"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model.trim="newUser.username" auto-complete="off" @keyup.enter.native="addOrUpdate"></el-input>
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
        id: null,
        account: '',
        password: '',
        username: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible: false
    }
  },
  methods: {
    addOrUpdate: function () {
      // 使用事件派发
      if (!this.newUser.account || this.newUser.account === '') {
        this.$message({
          showClose: true,
          message: '帐号不能为空'
        })
        return
      }
      if (!this.newUser.password || this.newUser.password === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空'
        })
        return
      }
      if (!this.newUser.username || this.newUser.username === '') {
        this.$message({
          showClose: true,
          message: '用户名不能为空'
        })
        return
      }
      var user = this.util.copyProperty(this.newUser)
      this.$root.eventHub.$emit('addOrUpdate', user)
      this.newUser = {}
      // 关闭编辑窗口
      this.dialogFormVisible = false
      this.$message({
        showClose: true,
        message: '操作成功'
      })
    },
    findUserById: function (user) {
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
    this.$root.eventHub.$on('findUserById', this.findUserById)
    this.$root.eventHub.$on('addUser', this.addUser)
  },
  // 最好在组件销毁前清除监听
  beforeDestroy: function () {
    this.$root.eventHub.$off('findUserById', this.findUserById)
    this.$root.eventHub.$off('addUser', this.addUser)
  }
}
</script>
<style>

</style>
