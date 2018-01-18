const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function showBoard(gameState) {
  gameState.forEach(player => player.moves.forEach(move =>
    board.splice(move, 1, player.symbol)));

  console.clear();
  console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
   ===+===+===
    ${board[3]} | ${board[4]} | ${board[5]}
   ===+===+===
    ${board[6]} | ${board[7]} | ${board[8]}
  `);
}

function greeting() {
  console.clear();
  console.log('Welcome to ticTacToe!');
}

function pleaseWait(playerSymbol) {
  console.log(`Please wait, ${playerSymbol} is choosing her move...`);
}

function promptUser(prompt) {
  process.stdout.write(`${prompt}: `);
}

function error(errorMsg) {
  console.log(errorMsg);
}

function activePlayer(playerSymbol) {
  console.log(`Player ${playerSymbol}`);
}

function gameOver(winner) {
  console.log(`GAME OVER: ${winner ? winner.symbol : 'NOBODY'} WINS!\n\nThanks for playing. Run "npm start" to play again :)\n`);
}

module.exports = {
  showBoard,
  greeting,
  pleaseWait,
  promptUser,
  error,
  activePlayer,
  gameOver,
};
