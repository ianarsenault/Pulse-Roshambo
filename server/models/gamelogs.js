const factory = require('./database.js')
let mongoose = require('mongoose')
let Schema = mongoose.Schema

const schema = {
  date: Date,
  playerOne: {
    type: Schema.Types.ObjectId,
    ref: 'Players'
  },
  playerOneThrew: String,
  playerTwo: {
    type: Schema.Types.ObjectId,
    ref: 'Players'
  },
  playerTwoThrew: String,
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Players'
  }
}

const GameLogs = factory("GameLogs", schema)

function fetchAll() {
    return new Promise((resolve, reject) => {
      GameLogs.find({})
        .sort([['date', -1]])
        .populate('playerOne')
        .populate('playerTwo')
        .populate('winner')
        .exec((error, gameLogs) => {
        if (error) { reject(error) }
        resolve(gameLogs)
      })
    })
}

function fetchPlayerGames(id, limit = 3) {
    return new Promise((resolve, reject) => {
      GameLogs.find({
        $or:[
          {playerOne:id},
          {playerTwo:id}
        ]})
        .sort([['date', -1]])
        .populate('playerOne')
        .populate('playerTwo')
        .populate('winner')
        .limit(limit)
        .exec((error, gameLogs) => {
          if (error) { reject(error) }
          resolve(gameLogs)
        })
    })
}

function addGame(date, playerOne, playerTwo, throwOne, throwTwo, winner) {
    let newGame = new GameLogs({
      date: date,
      playerOne: playerOne,
      playerOneThrew: throwOne,
      playerTwo: playerTwo,
      playerTwoThrew: throwTwo,
      winner: winner
    })
    return new Promise((resolve, reject) => {
        newGame.save(function (error, gamelog) {
            if (error) {
                reject(error)
            }
            resolve({
                gamelog: gamelog,
                success: true,
                message: 'Game was recorded successfully!'
            })
        })
    })
}

function fetchPlayerWins(id) {
  return new Promise((resolve, reject) => {
    GameLogs.find({winner: id}, function (error, gamelog) {
      if (error) {
        reject(error)
      }
      resolve(gamelog)
    })
  })
}

function fetchPlayerLosses(id) {
  return new Promise((resolve, reject) => {
    GameLogs.find({
      $or:[
        {playerOne:id},
        {playerTwo:id}
      ]})
      .where({ winner: { $ne: id } } )
      .exec((error, gameLogs) => {
        if (error) { reject(error) }
        resolve(gameLogs)
      })
  })
}

module.exports = {
  fetchAll,
  fetchPlayerGames,
  addGame,
  fetchPlayerWins,
  fetchPlayerLosses
}
