let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GameLogsSchema = new Schema({
  date: Date,
  playerOne: String,
  playerOneThrew: String,
  playerTwo: String,
  playerTwoThrew: String,
  winner: String
});

let GameLogs = mongoose.model("GameLogs", GameLogsSchema);
module.exports = GameLogs;