// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
// import router from './router'

// 引入公共JS
import util from '../util/util.js'

// 引入Axios
import axios from 'axios'

Vue.use(ElementUI)

Vue.prototype.util = util
Vue.config.productionTip = false

// axios baseURL
axios.defaults.baseURL = 'http://localhost:8080'

// 请求拦截器设置headers
axios.interceptors.request.use(config => {
  // Do something before request is sent
  var accessToken = sessionStorage.getItem('accessToken')
  // console.log(accessToken);
  if (typeof (accessToken) !== 'undefined' && accessToken != null && accessToken !== '') {
    // console.log('Authorization');
    config.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessToken')
  } else {
    // console.log('No Authorization');
    config.headers.common['Authorization'] = 'Basic dGVzdDoxMjM0NQ=='
  }
  return config
}, error => {
  // Do something with request error
  this.$message({
    showClose: true,
    message: '请求拦截error'
  })
  return Promise.reject(error)
})

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>',
  data: {
    // 组件使用事件中心进行通信
    eventHub: new Vue(),
    // Token
    accessToken: null
  },
  render: h => h(App)
})
