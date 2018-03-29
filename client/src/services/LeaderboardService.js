import Api from '@/services/Api'

export default {
  fetchLeaderboard() {
    return Api().get('leaderboard')
  },

  getPlayerLeaderboard(params) {
    return Api().get('leaderboard/player/' + params.id)
  }
}
