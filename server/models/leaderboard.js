const factory = require('./database.js');

const schema = {
  player: String,
  wins: Number,
  losses: Number,
  conquerer: String,
  nemesis: String
};

const Leaderboard = factory("Leaderboard", schema);

function createPlayerLeaderBoard() {
    return new Promise((resolve, reject) => {
        Leaderboard.find({}, Object.keys(schema).join(" "), function (error, leaderboard) {
           if (error) { reject(error); }
            resolve(leaderboard);
        }).sort({_id:-1});
    });
}

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

  function updatePlayerLeaderboard(id) {
    return new Promise((resolve, reject) => {
        Leaderboard.fetchPlayerLeaderboard(id, Object.keys(schema).join(" "), function (error, player) {
            if (error) {reject(error) }

            player.name = playerObj.name;
            player.nickname = playerObj.nickname;
            player.chant = playerObj.chant;

            player.save(function (error) {
                if (error) { reject(error); }
                resolve(true);
            });
        });
    });
}

module.exports = {
  fetchLeaderboard,
  fetchPlayerLeaderboard,
  updatePlayerLeaderboard,
  createPlayerLeaderBoard
};
