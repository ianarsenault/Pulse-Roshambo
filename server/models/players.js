const factory = require('./database.js');

const schema = {
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3
  },
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    minlength: 3
  },
  chant: {
    type: String,
    required: [true, 'Your chant is required'],
    minlength: 3
  },
  avatar: {
    type: String,
  },
  wins: {
    type: Number
  },
  losses: {
    type: Number
  }
};

const Players = factory("Players", schema);

function addPlayer(name, nickname, chant, avatar) {
  let new_player = new Players({
    name: name,
    nickname: nickname,
    chant: chant,
    avatar: avatar
  });
  return new Promise((resolve, reject) => {
    new_player.save(function (error) {
      if (error) {
        reject(error);
      }
      resolve({
        success: true,
        message: 'Player was saved successfully'
      });
    });
  });
}

function fetchAll() {
  return new Promise((resolve, reject) => {
    Players.find({}, Object.keys(schema).join(" "), function (error, players) {
      if (error) {
        reject(error);
      }
      resolve(players);
    }).sort({_id: -1})
  });
}

function fetchOne(id) {
  return new Promise((resolve, reject) => {
    Players.findById(id, Object.keys(schema).join(" "), function (error, player) {
      if (error) {
        reject(error);
      }
      resolve(player);
    })
  });
}

function updateOne(id, playerObj) {
  return new Promise((resolve, reject) => {
    Players.findById(id, Object.keys(schema).join(" "), function (error, player) {
      if (error) {
        reject(error)
      }

      player.name = playerObj.name;
      player.nickname = playerObj.nickname;
      player.chant = playerObj.chant;
      player.avatar = playerObj.avatar;

      player.save(function (error) {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    })
  });
}

function removeOne(id) {
  return new Promise((resolve, reject) => {
    Players.remove({
      _id: id
    }, function (error, player) {
      if (error) {
        reject(error);
      }
      resolve(true);
    });
  });
}

module.exports = {
  addPlayer,
  fetchAll,
  fetchOne,
  updateOne,
  removeOne
};
