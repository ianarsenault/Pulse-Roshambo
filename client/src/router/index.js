import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewPlayer from '@/components/NewPlayer'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/New-Player',
      name: 'NewPlayer',
      component: NewPlayer
    }
  ]
})
