// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

// 引入Axios
import axios from 'axios'
// 引入Cheerio
import cheerio from 'cheerio'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.prototype.$axios = axios

Vue.prototype.$cheerio = cheerio

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
