<template>
  <div class="hello">
    <el-row>
      <el-col :span="22"><h1>{{ msg }}</h1></el-col>
      <el-col :span="1" style="margin-top:10px;" v-show="this.$root.loginStatus">
        <el-button type="info" @click="loginFormVisible = true">登录</el-button>
      </el-col>
      <el-col :span="1" style="margin-top:10px;" v-show="!this.$root.loginStatus">
        <el-button type="info" @click="logout">注销</el-button>
      </el-col>
    </el-row>

    <el-dialog title="用户操作" :visible.sync="loginFormVisible">
      <el-form :model="loginModel">
        <el-form-item label="帐号" :label-width="formLabelWidth">
          <el-input v-model.trim="loginModel.account" auto-complete="off" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model.trim="loginModel.password" auto-complete="off" @keyup.enter.native="login"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loginModel: {
        account: '',
        password: ''
      },
      loginFormVisible: false,
      formLabelWidth: '40px'
    }
  },
  methods: {
    login: function () {
      if (!this.loginModel.account || this.loginModel.account === '') {
        this.$message({
          showClose: true,
          message: '帐号不能为空'
        })
        return
      }
      if (!this.loginModel.password || this.loginModel.password === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空'
        })
        return
      }
      this.cookies.remove('accessToken', { path: '/' })
      this.$root.eventHub.$emit('login', this.loginModel)
      this.loginFormVisible = false
      this.loginModel = {
        account: '',
        password: ''
      }
    },
    logout: function () {
      this.cookies.remove('accessToken', { path: '/' })
      this.$root.loginStatus = true
      this.$message({
        showClose: true,
        message: '注销成功(Logout Success.)'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] {
  display: none;
}

h1 {
  text-align: center;
  line-height: 25px;
}
</style>
