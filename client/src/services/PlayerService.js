import Api from '@/services/Api'

export default {
  fetchPlayers() {
    return Api().get('players')
  },

  addPlayer(params) {
    return Api().post('players', params);
  },

  getPlayer(params) {
    return Api().get('player/' + params.id)
  },

  updatePlayer(params) {
    return Api().put('players/' + params._id, params)
  },

  deletePlayer(id) {
    return Api().delete('players/' + id)
  },

  archivePlayer(id) {
    return Api().put('players/archive/' + id)
  },

  uploadAvatar(params) {
    return Api().post('uploads', params, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

}
