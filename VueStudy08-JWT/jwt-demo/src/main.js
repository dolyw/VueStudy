// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共JS
import util from '../util/util.js'

// 引入Axios
import axios from 'axios'

// 引入js-cookie
import cookies from 'js-cookie'

// 引入moment
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.util = util

Vue.prototype.$axios = axios

Vue.prototype.cookies = cookies

Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    // 组件使用事件中心进行通信
    eventHub: new Vue(),
    // 控制显示登录还是注销
    loginStatus: true
  },
  created: function () {
    // axios baseURL
    this.$axios.defaults.baseURL = 'http://localhost:8080'
    this.$axios.defaults.timeout = 10000

    var accessToken = this.cookies.get('accessToken')
    if (accessToken && accessToken !== '') {
      this.$root.loginStatus = false
    } else {
      this.$root.loginStatus = true
    }
    /* if (cookies.get('accessToken') && cookies.get('accessToken') !== '') {
      axios.defaults.headers.common['Authorization'] = cookies.get('accessToken')
    } */

    // 请求拦截器设置headers
    this.$axios.interceptors.request.use(config => {
      // Do something before request is sent
      var accessToken = this.cookies.get('accessToken')
      // console.log(accessToken);
      if (accessToken && accessToken !== '') {
        // console.log('Authorization');
        config.headers.common['Authorization'] = accessToken
      }
      return config
    }, error => {
      // Do something with request error
      return Promise.reject(error)
    })

    // 响应拦截器获取headers，设置(刷新)Token
    this.$axios.interceptors.response.use(response => {
      // Do something with response data
      var accessToken = response.headers['authorization']
      // console.log(response.headers)
      // console.log(response.headers.authorization)
      if (accessToken && accessToken !== '') {
        this.cookies.set('accessToken', accessToken, { expires: 1, path: '/' })
      }
      return response
    }, error => {
      // Do something with response error
      return Promise.reject(error)
    })
  },
  render: h => h(App)
})
