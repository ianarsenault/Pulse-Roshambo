const moment = require("moment")

module.exports = (app) => {
  app.post('/battle', (req, res) => {
    res.send(battle(req.body.player1, req.body.player2))
  })
}

const playerChoice = () => {
  return Math.floor(Math.random() * 3)
}

const choiceName = (number) => {
  return ["Rock", "Paper", "Scissors"][number]
}

const battle = (player1, player2) => {
  let p1Throws, p2Throws
  do {
    p1Throws = playerChoice()
    p2Throws = playerChoice()
  } while (p1Throws === p2Throws)

  let outcome = (3 + p1Throws - p2Throws) % 3
  let winner = ["Tie!", player1, player2][outcome]

  return {
    date: moment(),
    playerOne: player1,
    playerTwo: player2,
    throwOne: choiceName(p1Throws),
    throwTwo: choiceName(p2Throws),
    winner: winner
  }
}