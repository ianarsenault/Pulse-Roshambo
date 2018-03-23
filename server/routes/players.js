let Players = require("../models/players");

module.exports = (app) => {
    // Add new player
    app.post('/players', (req, res) => {
        Players.addPlayer(req.body.name, req.body.nickname, req.body.chant).then(
            (message) => { res.send(message); },
            (err) => { console.error(err); }
        );
    });

    // Fetch all players
    app.get('/players', (req, res) => {
        Players.fetchAll().then(
            (players) => { res.send({players: players}); },
            (err) => { console.error(err); }  
        );
    });

    // Fetch single player
    app.get('/player/:id', (req, res) => {
        Players.fetchOne(req.params.id).then(
            (player) => { res.send(player); },
            (err) => { console.error(err); } 
        );
    });

    // Update a player
    app.put('/players/:id', (req, res) => {
        Players.updateOne(req.params.id, req.body.name, req.body.nickname, req.body.chant).then(
            (success) => { res.send({ success: true }); },
            (err) => { console.error(err); }
        );
    });

    // Delete a player
    app.delete('/players/:id', (req, res) => {
        Players.removeOne(req.params.id).then(
            (success) => { res.send({ success: true }); },
            (err) => { console.error(err); }
        );
    });
};
