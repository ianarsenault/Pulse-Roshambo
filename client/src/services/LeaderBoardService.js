import Api from '@/services/Api'

export default {
  fetchGames() {
    return Api().get('leaderboard')
  },

  getPlayerGames(params) {
    return Api().get('leaderboard/player/' + params.id)
  },

  addGame(params) {
    return Api().post('leaderboard', params)
  }

}
