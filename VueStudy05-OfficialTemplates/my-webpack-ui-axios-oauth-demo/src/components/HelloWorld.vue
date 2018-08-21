<template>
  <div class="hello">
    <el-row>
      <el-col :span="22"><h1>{{ msg }}</h1></el-col>
      <el-col :span="1" style="margin-top:10px;" v-show="this.$root.accessToken == null">
        <el-button type="info" @click="loginFormVisible = true">登录</el-button>
      </el-col>
      <el-col :span="1" style="margin-top:10px;" v-show="this.$root.accessToken != null">
        <el-button type="info" @click="logout">注销</el-button>
      </el-col>
    </el-row>

    <el-dialog title="用户操作" :visible.sync="loginFormVisible">
      <el-form :model="loginModel">
        <el-form-item label="帐号" :label-width="formLabelWidth">
          <el-input v-model="loginModel.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="loginModel.password" auto-complete="off"></el-input>
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
        grant_type: 'password',
        username: '',
        password: ''
      },
      loginFormVisible: false,
      formLabelWidth: '40px'
    }
  },
  methods: {
    login: function () {
      this.$root.eventHub.$emit('login', this.loginModel)
      this.loginFormVisible = false
      this.loginModel = {
        grant_type: 'password',
        username: '',
        password: ''
      }
    },
    logout: function () {
      this.$root.eventHub.$emit('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center
}
</style>
