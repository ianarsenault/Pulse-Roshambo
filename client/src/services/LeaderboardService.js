import Api from '@/services/Api'
import GameLogsService from '@/services/GameLogsService'

function getNemesis(logs) {
  return null
}

function getConquerer(logs) {
  return null
}

function updateUserLeaderboardData(record, id) {
  logs = GameLogsService.getPlayerGames(id)
  record.nemesis = getNemesis(logs)
  record.conquerer = getConquerer(logs)
  return record
}


export default {
  fetchLeaderboard() {
    return Api().get('leaderboard')
  },

  getPlayerLeaderboard(params) {
    return Api().get('leaderboard/player/' + params.id)
  },

  createPlayerLeaderboard(params) {
    return Api().post('leaderboard/player/' + params.id)
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

    playerOneRecord = updateUserLeaderboardData(playerOneRecord, battle.playerOne)
    playerTwoRecord = updateUserLeaderboardData(playerTwoRecord, battle.playerTwo)

    Api().put('leaderboard/player/' + battle.playerOne, { leaderboard: playerOneRecord})
    Api().put('leaderboard/player/' + battle.playerTwo, { leaderboard: playerTwoRecord})
  }
}
