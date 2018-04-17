let Players = require("../models/players")
let multer  = require('multer')
let Leaderboard = require("../models/leaderboard")

let apiPrefix = '/api'

module.exports = (app) => {
  // Add new player
  app.post(`${apiPrefix}/players`, (req, res) => {
    Players.addPlayer(req.body.name, req.body.nickname, req.body.chant, req.body.avatar).then(
      (message) => {
        Leaderboard.createPlayerLeaderBoard(message.user.id)
        res.send(message)
      },
      (err) => {
        res.send(err)
      }
    ).catch(function (error) {
      return error
    })
  })

  // Fetch all players
  app.get(`${apiPrefix}/players`, (req, res) => {
    Players.fetchAll().then(
      (players) => {
        res.send({players: players})
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Fetch single player
  app.get(`${apiPrefix}/player/:id`, (req, res) => {
    Players.fetchOne(req.params.id).then(
      (player) => {
        res.send(player)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Update a player
  app.put(`${apiPrefix}/players/:id`, (req, res) => {
    Players.updateOne(req.params.id, req.body).then(
      (success) => {
        res.send({success: true})
      },
      (err) => {
        res.send(err)
      }
    ).catch(function (error) {
      return error
    })
  })

  // Delete a player
  app.delete(`${apiPrefix}/players/:id`, (req, res) => {
    Players.removeOne(req.params.id).then(
      (message) => {
        // DELETE USER FROM LEADERBOARD
        Leaderboard.removePlayerLeaderboard(req.params.id)
        res.send(message.success)
      },
      (err) => {
        console.error(err)
      }
    )
  })

  // Avatar upload
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = process.env.NODE_ENV === 'production'
        ? process.env.PROD_UPLOAD_LOCATION
        : process.env.DEV_UPLOAD_LOCATION
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
      cb(null, req.body.player+'.'+ext)
    }
  })

  let upload = multer({ storage: storage })
  app.post(`${apiPrefix}/uploads`, upload.single('image'), (req, res) => {
    return res.json('success')
  })

}
