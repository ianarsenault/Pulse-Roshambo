const factory = require('./database.js');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
};

const GameLogs = factory("GameLogs", schema);

function fetchAll() {
    return new Promise((resolve, reject) => {
      GameLogs.find({})
        .populate('playerOne')
        .populate('playerTwo')
        .populate('winner')
        .exec(function (error, gameLogs) {
        if (error) { reject(error); }
        resolve(gameLogs);
      })
    });
}

function fetchPlayerGames(id) {
    return new Promise((resolve, reject) => {
        GameLogs.find({
          $or:[
              {playerOne:id},
              {playerTwo:id}
          ]}, Object.keys(schema).join(" "), function (error, gameLogs) {

            if (error) { reject(error); }
            resolve(gameLogs);
        })
    });
}

function addGame(date, playerOne, playerTwo, throwOne, throwTwo, winner) {
    let new_game = new GameLogs({
      date: date,
      playerOne: playerOne,
      playerOneThrew: throwOne,
      playerTwo: playerTwo,
      playerTwoThrew: throwTwo,
      winner: winner
    });
    return new Promise((resolve, reject) => {
        new_game.save(function (error, gamelog) {
            if (error) {
                reject(error);
            }
            resolve({
                gamelog: gamelog,
                success: true,
                message: 'Game was recorded successfully!'
            });
        });
    });
}

module.exports = {
  fetchAll,
  fetchPlayerGames,
  addGame
};
