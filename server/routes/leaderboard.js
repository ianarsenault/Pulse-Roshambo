let Leaderboard = require("../models/leaderboard");

module.exports = (app) => {

  // Add new player
  app.post('/leaderboard/player/:id', (req, res) => {
    Leaderboard.createPlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard);
      },
      (err) => {
        console.error(err);
      }
    );
  });

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

  // Fetch a single players game log
  app.put('/leaderboard/player/:id', (req, res) => {
    Leaderboard.updatePlayerLeaderboard(req.params.id).then(
      (leaderboard) => {
        res.send(leaderboard);
      },
      (err) => {
        console.error(err);
      }
    );
  });
};
