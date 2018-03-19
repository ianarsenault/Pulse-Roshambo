import Api from '@/services/Api'

export default {
  fetchPlayers() {
    return Api().get('players')
  },
  addPlayer(params) {
    return Api().post('players', params);
  }
}
