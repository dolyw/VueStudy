<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :title="!userDto.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">

      <el-form v-loading="submitLoading" ref="userDto" :model="userDto" :rules="userDtoRules" label-width="100px" label-suffix="：" status-icon>

        <el-form-item label="帐号" prop="account">
          <el-input v-model.trim="userDto.account" :disabled="!userDto.id ? false : true" placeholder="请输入帐号"/>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="userDto.password" type="password" placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
          <el-input v-model.trim="userDto.username" placeholder="请输入昵称"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">提 交</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import * as user from '@/api/user'

export default {
  data() {
    return {
      // 提交按钮加载
      submitLoading: false,
      // 弹出框是否显示
      dialogVisible: false,
      // 表单新增编辑属性
      userDto: {
        id: null,
        account: '',
        password: '',
        username: ''
      },
      // 表单检验规则
      userDtoRules: {
        account: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  // 启动时就执行
  mounted: function() {

  },
  methods: {
    // 提交新增或更新
    submitForm() {
      this.submitLoading = true
      this.$refs.userDto.validate((valid) => {
        if (valid) {
          if (this.userDto.id) {
            // userId不为空更新
            user.update(this.userDto).then(response => {
              // 执行成功重置表单且弹出提示信息
              this.resetForm()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }).catch(error => {
              console.log(error)
            }).then(() => {
              // always executed 类似finally
              this.submitLoading = false
            })
          } else {
            // userId为空新增
            user.add(this.userDto).then(response => {
              // 执行成功重置表单且弹出提示信息
              this.resetForm()
              this.$message({
                type: 'success',
                message: response.msg
              })
            }).catch(error => {
              console.log(error)
            }).then(() => {
              // always executed 类似finally
              this.submitLoading = false
            })
          }
        } else {
          this.submitLoading = false
          return false
        }
      })
    },
    // 重置
    resetForm() {
      // 清空表单
      this.$refs.userDto.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
      // 刷新父组件列表
      // this.$parent.list(this.$parent.serachForm)
      // 父子组件事件监听刷新父组件列表
      this.$emit('refreshTableData')
      this.submitLoading = false
    },
    // 准备新增或更新
    preById: function(id) {
      // userId不为空更新
      if (id) {
        this.submitLoading = true
        this.userDto.id = id
        user.findById(id).then(response => {
          const data = response.data
          this.userDto = data
          this.submitLoading = false
        })
      } else {
        // id为空新增
        this.userDto.id = ''
      }
      // 显示弹出框
      this.dialogVisible = true
    },
    // 弹窗关闭事件方法
    handleClose(done) {
      // 重置表单
      this.resetForm()
      done()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
