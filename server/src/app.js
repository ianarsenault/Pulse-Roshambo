const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

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

// app.listen(process.env.PORT || 8081)

require('express-debug')(app)

module.exports = app
