import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import UserList from '@/components/UserList.vue'
import UserOnline from '@/components/UserOnline.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/index/userList'},
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'userList',
          name: 'userList',
          component: UserList
        },
        {
          path: 'userOnline',
          name: 'userOnline',
          component: UserOnline
        }
      ]
    }
  ]
})
