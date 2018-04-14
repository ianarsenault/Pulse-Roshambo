const factory = require('./database.js')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = {
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Players'
  },
  wins: Number,
  losses: Number,
  conquerer: String,
  nemesis: String
};

const Leaderboard = factory("Leaderboard", schema)

function createPlayerLeaderBoard(id) {
  let newLeaderboard = new Leaderboard({
    player: id,
    wins: 0,
    losses: 0,
    conquerer: null,
    nemesis: null
  });
  return new Promise((resolve, reject) => {
    newLeaderboard.save(function (error, leaderboard) {
      if (error) {
        reject(error);
      }
      resolve({
        leaderboard: leaderboard,
        success: true,
        message: 'Leaderboard record for user has been created'
      })
    })
  })
}

function fetchLeaderboard() {
  return new Promise((resolve, reject) => {
    Leaderboard.find({})
      .populate('player')
      .exec((error, leaderboards) => {
        if (error) {
          reject(error)
        }
        resolve(leaderboards)
      })
  })
}

function fetchPlayerLeaderboard(id) {
  return new Promise((resolve, reject) => {
    Leaderboard.find({player: id}, Object.keys(schema).join(" "), function (error, leaderboard) {
      if (error) {
        reject(error)
      }
      resolve(leaderboard)
    })
  })
}

function updatePlayerLeaderboard(id, newLeaderboard) {
  return new Promise((resolve, reject) => {
    Leaderboard.fetchPlayerLeaderboard(id, Object.keys(schema).join(" "), function (error, leaderboard) {
      if (error) {
        reject(error)
      }

      leaderboard.wins = newLeaderboard.wins
      leaderboard.losses = newLeaderboard.losses
      leaderboard.nemesis = newLeaderboard.nemesis
      leaderboard.conquerer = newLeaderboard.conquerer

      leaderboard.save(function (error) {
        if (error) {
          reject(error)
        }
        resolve(true)
      })
    })
  })
}

let updateLeaderboard = (gameResult) => {
  return new Promise((resolve, reject) => {

    Leaderboard.findOne({player: gameResult.player}, function (error, leaderboard) {
      if (error) {
        reject(error)
      }
      if (gameResult.result) {
        leaderboard.wins ? leaderboard.wins += 1 : 1
      } else {
        leaderboard.losses ? leaderboard.losses += 1 : 1
      }

      leaderboard.save(error => {
        if (error) reject(error)
        resolve(true)
      })
    })

  })
}

module.exports = {
  fetchLeaderboard,
  fetchPlayerLeaderboard,
  updatePlayerLeaderboard,
  createPlayerLeaderBoard,
  updateLeaderboard
}
