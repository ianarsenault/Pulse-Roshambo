let Leaderboard = require("../models/leaderboard")

module.exports = (app) => {

  // Create empty leaderboard record for user
  app.post('/leaderboard/player/:id', (req, res) => {
    Leaderboard.createPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Fetch all leaderboards in the database
  app.get('/leaderboard', (req, res) => {
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
  app.get('/leaderboard/player/:id', (req, res) => {
    Leaderboard.fetchPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Update the leaderboard for a player
  app.put('/leaderboard/player/:id', (req, res) => {
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
