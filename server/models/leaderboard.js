const factory = require('./database.js');

const schema = {
  player: String,
  wins: Number,
  loses: Number,
  conquerer: String,
  nemesis: String
};

const Leaderboard = factory("Leaderboard", schema);

function fetchLeaderboard() {
    return new Promise((resolve, reject) => {
        Leaderboard.find({}, Object.keys(schema).join(" "), function (error, leaderboard) {
           if (error) { reject(error); }
            resolve(leaderboard);
        }).sort({_id:-1})
    });
}

function fetchPlayerLeaderboard(id) {
    return new Promise((resolve, reject) => {
        Leaderboard.find({player:id}, Object.keys(schema).join(" "), function (error, leaderboard) {
            if (error) { reject(error); }
            resolve(leaderboard);
        })
    });
}

module.exports = {
  fetchLeaderboard,
  fetchPlayerLeaderboard
};
