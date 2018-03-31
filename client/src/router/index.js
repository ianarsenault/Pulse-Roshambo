import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewPlayer from '@/components/NewPlayer'
import Players from '@/components/Players'
import GameLogs from '@/components/GameLogs'
import EditPlayer from '@/components/EditPlayer'
import PlayerProfile from '@/components/PlayerProfile'
import Leaderboard from '@/components/Leaderboard'

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
      path: '/newplayer',
      name: 'NewPlayer',
      component: NewPlayer
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/gamelogs',
      name: 'GameLogs',
      component: GameLogs
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard
    },
    {
      path: '/player/:id',
      name: 'PlayerProfile',
      component: PlayerProfile
    },
    {
      path: '/player/:id/edit',
      name: 'EditPlayer',
      component: EditPlayer
    }
  ]
})
