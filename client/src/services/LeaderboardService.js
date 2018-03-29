import Api from '@/services/Api'

export default {
  fetchLeaderboard() {
    return Api().get('leaderboard')
  },

  getPlayerLeaderboard(params) {
    return Api().get('leaderboard/player/' + params.id)
  },

  createPlayerLeaderboard(params) {
    return Api().get('leaderboard/player/' + params.id)
  },

  updateLeaderboards(battle) {
    playerOneRecord = getPlayerLeaderboard(battle.playerOne)
    playerTwoRecord = getPlayerLeaderboard(battle.playerTwo)

    winner = battle.winner

    if (winner == battle.playerOne) {
      playerOneRecord.wins++
    } else {
      playerTwoRecord.wins++
    }

    if (winner != battle.playerOne) {
      playerOneRecord.losses++
    } else {
      playerTwoRecord.losses++
    }


  }
}
