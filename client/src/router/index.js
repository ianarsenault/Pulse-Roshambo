import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Landing from '@/components/Landing'

Vue.use(Router)

export default new Router({
  history: true,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    }
  ]
})
