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

function updateLeaderBoard(params) {
  return Api().post('leaderboard/update', params)
}

function updateLeaderboards(battle) {
  let playerOneResult = battle.winner === battle.playerOne
  let playerTwoResult = battle.winner === battle.playerTwo
  updateLeaderBoard({ player: battle.playerOne, result: playerOneResult})
  updateLeaderBoard({ player: battle.playerTwo, result: playerTwoResult})
}

export default {
  fetchLeaderboard,
  getPlayerLeaderboard,
  createPlayerLeaderboard,
  updateLeaderboards
}
