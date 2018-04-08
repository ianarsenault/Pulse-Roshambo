const factory = require('./database.js')

const schema = {
  player: String,
  wins: Number,
  losses: Number,
  conquerer: String,
  nemesis: String
}

const Leaderboard = factory("Leaderboard", schema)

function createPlayerLeaderBoard(id) {
    let new_leaderboard = new Leaderboard({
        player: id,
        wins: 0,
        losses: 0,
        conquerer: null,
        nemesis: null
    })
    return new Promise((resolve, reject) => {
        new_leaderboard.save(function (error, leaderboard) {
            if (error) {
                reject(error)
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
        Leaderboard.find({}, Object.keys(schema).join(" "), function (error, leaderboard) {
           if (error) { reject(error) }
            resolve(leaderboard)
        }).sort({_id:-1})
    })
}

function fetchPlayerLeaderboard(id) {
    return new Promise((resolve, reject) => {
        Leaderboard.find({player: id}, Object.keys(schema).join(" "), function (error, leaderboard) {
            if (error) { reject(error) }
            resolve(leaderboard)
        })
    })
  }

  function updatePlayerLeaderboard(id, new_leaderboard) {
    return new Promise((resolve, reject) => {
        Leaderboard.fetchPlayerLeaderboard(id, Object.keys(schema).join(" "), function (error, leaderboard) {
            if (error) {reject(error) }

            leaderboard.wins = new_leaderboard.wins
            leaderboard.losses = new_leaderboard.losses
            leaderboard.nemesis = new_leaderboard.nemesis
            leaderboard.conquerer = new_leaderboard.conquerer

            leaderboard.save(function (error) {
                if (error) { reject(error) }
                resolve(true)
            })
        })
    })
}

module.exports = {
  fetchLeaderboard,
  fetchPlayerLeaderboard,
  updatePlayerLeaderboard,
  createPlayerLeaderBoard
}
