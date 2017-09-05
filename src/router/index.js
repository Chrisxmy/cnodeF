import Vue from 'vue'
import Router from 'vue-router'
import app from '@/App'
import index from '@/components/index'
import login from '@/components/login'
import sendTopic from '@/components/sendTopic'
import topicDetail from '@/components/topicDetail'
import cardList from '@/components/cardList'
import personal from '@/components/personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: app,
      redirect: 'xmy/index',
      children: [
        {
          path: 'xmy',
          name: 'index',
          component: index,
          children: [
            {
              path: 'topicDetail',
              name: 'topicDetail',
              component: topicDetail
            },
            {
              path: 'index',
              name: 'cardList',
              component: cardList
            }
          ]
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal
        },
        {
          path: 'sendTopic',
          name: 'sendTopic',
          component: sendTopic
        },
        {
          path: 'login',
          name: 'login',
          component: login
        }
      ]
    }
  ]
})
