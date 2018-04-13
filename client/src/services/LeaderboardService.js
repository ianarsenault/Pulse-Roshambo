import Api from '@/services/Api'
import GameLogsService from '@/services/GameLogsService'

function getNemesis(logs) {
  return null
}

function getConquerer(logs) {
  return null
}

function updateUserLeaderboardData(record, player) {
  logs = GameLogsService.getPlayerGames(player._id)
  record.nemesis = getNemesis(logs)
  record.conquerer = getConquerer(logs)
  return record
}

function getPlayerLeaderboard(params) {
  return Api().get('leaderboard/player/' + params.id)
}

function fetchLeaderboard() {
  return Api().get('leaderboard')
}

function createPlayerLeaderboard(params) {
  return Api().post('leaderboard/player/' + params.id)
}

function updateLeaderboards(battle) {
  let playerOneRecord, playerTwoRecord

  console.log('battle', battle)

  getPlayerLeaderboard({id: battle.playerOne._id}).then(function(data) {
    playerOneRecord = { wins: 0 }
  })

  getPlayerLeaderboard({id: battle.playerTwo._id}).then(function(data) {
    playerTwoRecord = data.data ? data.data : { wins: 0 }
  })

  console.log('p1', playerOneRecord)
  console.log('p1', playerTwoRecord)


  let winner = battle.winner

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

export default {
  fetchLeaderboard,
  getPlayerLeaderboard,
  createPlayerLeaderboard,
  updateLeaderboards
}
