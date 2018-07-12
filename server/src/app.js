const express = require('express')
const session = require('express-session')
const Keycloak = require('keycloak-connect')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config();

let memoryStore = session.MemoryStore()

const app = express()
app.use( session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}))
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

let keycloak = new Keycloak({
    store: memoryStore
})

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}))

// SET UP DATABASE DO NOT REMOVE
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/roshambo')
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function(callback){
    console.log("Connection Succeeded")
})
// END DATABASE SETUP

// configure routes
require("../routes/players")(app)
require("../routes/battle")(app)
require("../routes/gamelogs")(app)
require("../routes/leaderboard")(app)
let Players = require("../models/players")
let apiPrefix = '/api'
// Fetch single player
app.get(`${apiPrefix}/player/:id`, keycloak.protect(), (req, res) => {
  Players.fetchOne(req.params.id).then(
    (player) => {
      res.send(player)
    },
    (err) => {
      console.error(err)
    }
  )
})

// app.listen(process.env.PORT || 8081)

require('express-debug')(app)

module.exports = app
