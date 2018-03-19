let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayersSchema = new Schema({
    name: String,
    nickname: String,
    chant: String
});

let Players = mongoose.model("Players", PlayersSchema);
module.exports = Players;