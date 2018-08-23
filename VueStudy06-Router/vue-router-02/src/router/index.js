import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import News from '@/components/News.vue'
import Message from '@/components/Message.vue'

Vue.use(Router)

export default new Router({
  routes: [
    /* {path: '/', redirect: '/home'}, */
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'news',
          name: 'News',
          component: News
        },
        {
          path: 'message',
          name: 'Message',
          component: Message
        }
      ]
    }, {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
