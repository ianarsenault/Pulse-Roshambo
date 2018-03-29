let Leaderboard = require("../models/leaderboard");

module.exports = (app) => {
  // Fetch all games
  app.get('/leaderboard', (req, res) => {
    Leaderboard.fetchLeaderboard().then(
      (leaderboard) => {
        res.send({leaderboard: leaderboard});
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Fetch a single players game log
  app.get('/leaderboard/player/:id', (req, res) => {
    Leaderboard.fetchPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard);
      },
      (err) => {
        console.error(err);
      }
    );
  });
};
