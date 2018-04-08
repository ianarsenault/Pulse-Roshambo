import Api from '@/services/Api'

export default {
  fetchGames() {
    return Api().get('gamelogs')
  },

  getPlayerGames(params) {
    return Api().get('gamelogs/player/' + params.id)
  },

  addGame(params) {
    return Api().post('gamelogs', params)
  }
}
