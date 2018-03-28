const factory = require('./database.js');

const schema = {
  date: Date,
  playerOne: String,
  playerOneThrew: String,
  playerTwo: String,
  playerTwoThrew: String,
  winner: String
};

const GameLogs = factory("GameLogs", schema);

function fetchAll() {
    return new Promise((resolve, reject) => {
        GameLogs.find({}, Object.keys(schema).join(" "), function (error, gameLogs) {
           if (error) { reject(error); }
            resolve(gameLogs);
        }).sort({_id:-1})
    });
}

function fetchPlayerGames(id) {
    return new Promise((resolve, reject) => {
        GameLogs.find({playerOne:id}, Object.keys(schema).join(" "), function (error, gameLogs) {
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
        new_game.save(function (error) {
            if (error) {
                reject(error);
            }
            resolve({
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
