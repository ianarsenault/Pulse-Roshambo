let GameLogs = require("../models/gamelogs")

module.exports = (app) => {
  // Fetch all games
  app.get('/gamelogs', (req, res) => {
    GameLogs.fetchAll().then(
      (gamelogs) => {
        res.send({gamelogs: gamelogs})
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Fetch a single players game log
  app.get('/gamelogs/player/:id', (req, res) => {
    GameLogs.fetchPlayerGames(req.params.id).then(
      (gamelogs) => {
        res.send(gamelogs)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Add new player
  app.post('/gamelogs', (req, res) => {
    GameLogs.addGame(req.body.date, req.body.playerOne, req.body.playerTwo, req.body.throwOne, req.body.throwTwo, req.body.winner).then(
      (message) => {
        res.send(message)
      },
      (err) => {
        res.send(err)
      }
    ).catch(function (error) {
      return error
    })
  })
}
