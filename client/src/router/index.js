import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewPlayer from '@/components/NewPlayer'
import Players from '@/components/Players'
import GameLogs from '@/components/GameLogs'
import EditPlayer from '@/components/EditPlayer'
import PlayerProfile from '@/components/PlayerProfile'

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
    },
    {
      path: '/Players',
      name: 'Players',
      component: Players
    },
    {
      path: '/GameLogs',
      name: 'GameLogs',
      component: GameLogs
    },
    {
      path: '/player/:id',
      name: 'EditPlayer',
      component: EditPlayer
    },
    {
      path: '/player/:id/profile',
      name: 'PlayerProfile',
      component: PlayerProfile
    }
  ]
})
