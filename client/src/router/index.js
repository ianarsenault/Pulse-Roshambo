import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewPlayer from '@/components/NewPlayer'
import Players from '@/components/Players'
import LeaderBoard from '@/components/Leaderboard'
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
      path: '/LeaderBoard',
      name: 'LeaderBoard',
      component: LeaderBoard
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
