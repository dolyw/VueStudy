// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

// 全局守卫
/* router.beforeEach((to, from, next) => {
  // ...
  console.log('beforeEach')
}) */

// 全局路由后置钩子
router.afterEach((to, from) => {
  // ...
  console.log('afterEach')
})
