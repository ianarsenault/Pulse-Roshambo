import Api from '@/services/Api'

export default {
  fetchGames() {
    return Api().get('gamelogs')
  },

  getPlayerGames(params) {
    return Api().get('gamelogs/player/' + params.id)
  },

  getPlayerWinsCount(params) {
    return Api().get('gamelogs/player/wins/' + params.id)
  },

  getPlayerLossCount(params) {
    return Api().get('gamelogs/player/losses/' + params.id)
  },

  getPlayerThrows(params) {
    return Api().get('gamelogs/player/throws/' + params.id)
  },

  addGame(params) {
    return Api().post('gamelogs', params)
  }

}
