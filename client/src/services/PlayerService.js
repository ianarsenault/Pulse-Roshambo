import Api from '@/services/Api'
import LeaderboardService from '@/services/LeaderboardService'

export default {
  fetchPlayers() {
    return Api().get('players')
  },

  addPlayer(params) {
    LeaderboardService.createPlayerLeaderBoard(params);
    return Api().post('players', params);
  },

  getPlayer(params) {
    return Api().get('player/' + params.id)
  },

  updatePlayer(params) {
    return Api().put('players/' + params.id, params)
  },

  deletePlayer(id) {
    return Api().delete('players/' + id)
  }

}
