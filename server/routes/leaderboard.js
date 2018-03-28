let LeaderBoard = require("../models/leaderboard");

module.exports = (app) => {
  // Fetch all games
  app.get('/leaderboard', (req, res) => {
    LeaderBoard.fetchAll().then(
      (leaderboards) => {
        res.send({leaderboards: leaderboards});
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Fetch a single players game log
  app.get('/leaderboard/player/:id', (req, res) => {
    LeaderBoard.fetchPlayerGames(req.params.id).then(
      (leaderboards) => {
        res.send(leaderboards);
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Add new player
  app.post('/leaderboard', (req, res) => {
    LeaderBoard.addGame(req.body.date, req.body.playerOne, req.body.playerTwo, req.body.throwOne, req.body.throwTwo, req.body.winner).then(
      (message) => {
        res.send(message);
      },
      (err) => {
        res.send(err);
      }
    ).catch(function (error) {
      return error
    })
  });
};
