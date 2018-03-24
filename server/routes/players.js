let Players = require("../models/players");
let multer  = require('multer');
let path = require('path');

module.exports = (app) => {
  // Add new player
  app.post('/players', (req, res) => {
    Players.addPlayer(req.body.name, req.body.nickname, req.body.chant).then(
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

  // Fetch all players
  app.get('/players', (req, res) => {
    Players.fetchAll().then(
      (players) => {
        res.send({players: players});
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Fetch single player
  app.get('/player/:id', (req, res) => {
    Players.fetchOne(req.params.id).then(
      (player) => {
        res.send(player);
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Update a player
  app.put('/players/:id', (req, res) => {
    const playerObj = {
      name: req.body.name,
      nickname: req.body.nickname,
      chant: req.body.chant
    };

    Players.updateOne(req.params.id, playerObj).then(
      (success) => {
        res.send({success: true});
      },
      (err) => {
        res.send(err);
      }
    ).catch(function (error) {
      return error
    });
  });

  // Delete a player
  app.delete('/players/:id', (req, res) => {
    Players.removeOne(req.params.id).then(
      (success) => {
        res.send({success: true});
      },
      (err) => {
        console.error(err);
      }
    );
  });

  // Avatar upload
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/assets/images/uploads')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
      cb(null, req.body.player+'.'+ext)
    }
  })

  let upload = multer({ storage: storage })
  app.post('/uploads', upload.single('image'), (req, res) => {
    return res.json('success');
  });
};
``