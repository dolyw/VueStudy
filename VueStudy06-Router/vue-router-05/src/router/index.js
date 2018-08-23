import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import News from '@/components/News.vue'
import Message from '@/components/Message.vue'
import NewsChild from '@/components/NewsChild.vue'

Vue.use(Router)

export default new Router({
  routes: [
    /* {path: '/', redirect: '/home/news/newsChild'}, */
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'news',
          name: 'news',
          component: News,
          children: [
            {
              path: 'newsChild/:newsId',
              name: 'newsChild',
              component: NewsChild
            },
            {
              path: 'newsChild',
              name: 'newsChild',
              component: NewsChild
            }
          ]
        },
        {
          path: 'message',
          name: 'message',
          component: Message
        }
      ]
    }, {
      path: '/about',
      name: 'about',
      component: About/* ,
      beforeEnter: (to, from, next) => {
        // ...
      } */
    }
  ]
})
