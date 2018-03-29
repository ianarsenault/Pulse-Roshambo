import GameLogsService from '@/services/GameLogsService'
import LeaderboardService from '@/services/LeaderboardService'
import moment from 'moment'

function playerChoice(){
  return Math.floor(Math.random() * 3);
}

function choiceName(number){
  return ["Rock", "Paper", "Scissors"][number];
}

const battle = (player1, player2) => {
  let p1Throws, p2Throws;
  do {
    p1Throws = playerChoice();
    p2Throws = playerChoice();
  } while (p1Throws === p2Throws);

  let outcome = (3 + p1Throws - p2Throws) % 3;
  let winner = ["Tie!", player1, player2][outcome];
  let game = {
    date: moment(),
    playerOne: player1,
    playerTwo: player2,
    throwOne: choiceName(p1Throws),
    throwTwo: choiceName(p2Throws),
    winner: winner
  }

  GameLogsService.addGame(game);
  LeaderboardService.updateLeaderboards(game);

  return {
    winner,
    p1Throws: choiceName(p1Throws),
    p2Throws: choiceName(p2Throws)
  };
}

export default battle;
