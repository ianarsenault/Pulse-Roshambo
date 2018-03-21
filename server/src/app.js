const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/players');
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

let Players = require("../models/players");

// Add new player
app.post('/players', (req, res) => {
    let db = req.db;
    let name = req.body.name;
    let nickname = req.body.nickname;
    let chant = req.body.chant;

    let new_player = new Players({
        name: name,
        nickname: nickname,
        chant: chant
    })

    new_player.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Player was saved successfully'
        })
    })
});


// Fetch all players
app.get('/players', (req, res) => {
    Players.find({}, 'name nickname chant', function (error, players) {
        if (error) { console.error(error); }
        res.send({
            players: players
        })
    }).sort({_id:-1})
})


// Fetch single player
app.get('/player/:id', (req, res) => {
    let db = req.db
    Players.findById(req.params.id, 'name nickname chant', function (error, player) {
        if (error) { console.log(error) }
        res.send(player)
    })
})


// Update a player
app.put('/players/:id', (req, res) => {
    let db = req.db
    Players.findById(req.params.id, 'name nickname chant', function (error, player) {
        if (error) { console.log(error) }

        player.name = req.body.name
        player.nickname = req.body.nickname
        player.chant = req.body.chant

        player.save(function (error) {
            if (error) { console.log(error) }

            res.send({
                success: true
            })
        })

    })
})


// Delete a player
app.delete('/players/:id', (req, res) => {
    let db = req.db
    Players.remove({
        _id: req.params.id
    }, function (error, player) {
        if (error) {
            res.send(error)
        }
        res.send({
            success: true
        })
    })
})


// app.listen(process.env.PORT || 8081)

require('express-debug')(app);

module.exports = app;