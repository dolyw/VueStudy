<template>
    <div>
        <p><label>搜索:</label><input type="text" v-model="searchStrGrid"></p>
        <table border="1">
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
        </table>
        <table border="1">
            <thead>
                <tr>
                    <td>No</td>
                    <td v-for="col in colNameGrid" :key="col.name">{{ col.name | capitalize }}</td>
                    <td>Option</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in filteredData" :key="user.name">
                    <td>{{ index + 1 }}</td>
                    <td v-for="property in user" :key="property">{{ property }}</td>
                    <td>
                        <button @click="findUserByName(user.name)">修改</button>
                        <button @click="delUser(index)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  name: 'TableGrid',
  data () {
    return {
      newUser: {
        name: '',
        sex: '男',
        age: 0
      },
      searchStrGrid: ''
    }
  },
  props: {
    colNameGrid: Array,
    tableDataGrid: Array
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
      return this.tableDataGrid.filter(function (user) {
        return user.name.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.sex.toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1 ||
                    user.age.toString().toLowerCase().indexOf(self.searchStrGrid.toLowerCase()) !== -1
      })
    }
  },
  methods: {
    delUser: function (index) {
      this.tableDataGrid.splice(index, 1)
    },
    addOrUpdate: function () {
      if (this.newUser.name === '') {
        alert('name is null')
        return
      }
      var reg = /^\d*$/
      if (!reg.test(this.newUser.age)) {
        alert('age is type error')
        return
      }
      var user = this.util.copyProperty(this.newUser)
      this.newUser = {name: '', sex: '男', age: 0}
      for (var index = 0, len = this.tableDataGrid.length; index < len; index++) {
        if (this.tableDataGrid[index].name === user.name) {
          /* this.tableDataGrid[index].name = user.name;
                        this.tableDataGrid[index].sex = user.sex;
                        this.tableDataGrid[index].age = user.age; */
          // 用for不用一个个写
          for (var col in user) {
            this.tableDataGrid[index][col] = user[col]
          }
          // 使用下面这个方法对象替换了，但是属性还是没替换，重新加载表格就好了
          // this.tableDataGrid[index] = Vue.copyProperty(user);
          return
        }
      }
      this.tableDataGrid.push(user)
      // 查看父组件数据
      /* var rootData = this.$parent.tableData;
                for (var index = 0, len = rootData.length; index < len; index++) {
                    alert(rootData[index].name);
                } */
    },
    findUserByName: function (name) {
      var tableDataGrid = this.tableDataGrid
      for (var index = 0, len = this.tableDataGrid.length; index < len; index++) {
        if (tableDataGrid[index].name === name) {
          this.newUser = this.util.copyProperty(tableDataGrid[index])
        }
      }
    }
  }
}
</script>
<style scoped>
table {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
