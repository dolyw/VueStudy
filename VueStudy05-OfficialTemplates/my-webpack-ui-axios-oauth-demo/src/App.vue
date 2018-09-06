<template>
  <div>
    <!-- <img src="./assets/logo.png"> -->
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header>
        <hello-world></hello-world>
      </el-header>
      <el-container>
        <el-aside style="width: 210px;">
          <el-menu :default-openeds="['1', '2', '1-4']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="20">
              <el-button @click="addUser(true)">新增</el-button>
              </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchStr"></el-input>
            </el-col>
          </el-row>
          <br/>
          <table-grid :search-str-grid="searchStr"></table-grid>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/Login.vue'
import TableGrid from './components/TableGrid.vue'

export default {
  name: 'App',
  data () {
    return {
      searchStr: ''
    }
  },
  components: {
    HelloWorld,
    TableGrid
  },
  methods: {
    addUser: function (flag) {
      this.$root.eventHub.$emit('addUser', flag)
    }
  }
}
</script>

<style>
.el-header {
  background-color: #909399;
  width: 100%;
}

.el-aside {
  width: 200px;
}

.el-menu {
  width: 200px;
}
</style>
