import Api from '@/services/Api'
import LeaderboardService from '@/services/LeaderboardService'

export default {
  fetchPlayers() {
    return Api().get('players')
  },

  addPlayer(params) {
    response = Api().post('players', params);
    LeaderboardService.createPlayerLeaderBoard(response.id);
    return response
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
