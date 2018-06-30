const factory = require('./database.js')
let mongoose = require('mongoose')
let ObjectID = require('mongodb').ObjectID
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

function fetchPlayerThrows(id) {
  return new Promise((resolve, reject) => {
    GameLogs.aggregate([
      {$project: {
        player: [
          {id: '$playerOne', threw: '$playerOneThrew'},
          {id: '$playerTwo', threw: '$playerTwoThrew'}
        ],
      }},
      {$unwind: '$player'},
      {$match : {
        "player.id" : new ObjectID(id)
      }},
      {
        $group: {
          _id: '$player.id',
          player: {
            $first: "$player.id" },
            Paper: {$sum: {$cond: [{$eq: ['$player.threw', 'Paper']}, 1, 0]}},
            Rock: {$sum: {$cond: [{$eq: ['$player.threw', 'Rock']}, 1, 0]}},
            Scissors: {$sum: {$cond: [{$eq: ['$player.threw', 'Scissors']}, 1, 0]}}
          }
        }
    ], (error, playerThrowCount) => {
      if (error) { reject(error) }
      resolve(playerThrowCount)
    })
  })
}

function fetchPlayerGameCount(id) {
  return new Promise((resolve, reject) => {
    GameLogs.find({
      $or:[
        {playerOne:id},
        {playerTwo:id}
      ]})
      .count((error, count) => {
        if (error) { reject(error) }
        let games = {
          count: count
        }
        resolve(games)
      })
  })
}

module.exports = {
  fetchAll,
  fetchPlayerGames,
  addGame,
  fetchPlayerWins,
  fetchPlayerLosses,
  fetchPlayerThrows,
  fetchPlayerGameCount
}
