<template>
  <div style="height: 700px;border: 1px solid #eee;">
    <!-- <img src="./assets/logo.png"> -->
    <el-container>
      <el-header>
        <login></login>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="defaultActive"
              class="el-menu-vertical-demo"
              active-text-color="#909399" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项一</el-menu-item>
                <el-menu-item index="1-2">选项二</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项三</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index/userList">用户列表</el-menu-item>
                <el-menu-item index="/index/userOnline">在线用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">关于</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from './Login.vue'

export default {
  name: 'App',
  components: {
    Login
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style>

.el-header {
  background-color: #909399;
  width: 100%;
}

</style>
