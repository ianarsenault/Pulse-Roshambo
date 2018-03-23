const factory = require('./database.js');

const schema = {
  date: Date,
  playerOne: String,
  playerOneThrew: String,
  playerTwo: String,
  playerTwoThrew: String,
  winner: String
};

module.exports = factory("GameLogs", schema);
