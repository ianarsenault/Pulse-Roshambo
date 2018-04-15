let Leaderboard = require("../models/leaderboard")

let apiPrefix = '/api';

module.exports = (app) => {

  // Create empty leaderboard record for user
  app.post(`${apiPrefix}/leaderboard/player/:id`, (req, res) => {
    Leaderboard.createPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Update Leaderboard from a battle
  app.post(`${apiPrefix}/leaderboard/update`, (req, res) => {
    Leaderboard.updateLeaderboard(req.body).then(
      (leaderboard) => {
        res.send({leaderboard: leaderboard})
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Fetch all leaderboards in the database
  app.get(`${apiPrefix}/leaderboard`, (req, res) => {
    Leaderboard.fetchLeaderboard().then(
      (leaderboard) => {
        res.send({leaderboard: leaderboard})
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Fetch the leaderboard data for one user
  app.get(`${apiPrefix}/leaderboard/player/:id`, (req, res) => {
    Leaderboard.fetchPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        console.log('leader', leaderboard)
        res.send(leaderboard)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Update the leaderboard for a player
  app.put(`${apiPrefix}/leaderboard/player/:id`, (req, res) => {
    Leaderboard.updatePlayerLeaderboard(req.params.id, req.params.leaderboard).then(
      (leaderboard) => {
        res.send(leaderboard)
      },
      (err) => {
        console.error(err)
      }
    )
  })
}
