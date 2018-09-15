const WINNING_PATTERNS = require('./winning_patterns');

function defineSettings({
  firstPlayerIsHuman,
  secondPlayerIsHuman,
}) {
  // Don't actually need a board. Just need players' moves to test against winning patterns
  const initialGameState = {
    activePlayer: 'X',
    waitingPlayer: 'Y',
    players: {
      X: {
        moves: [],
        isHuman: firstPlayerIsHuman,
        symbol: 'X',
      },
      Y: {
        moves: [],
        isHuman: secondPlayerIsHuman,
        symbol: 'Y',
      },
    },
  };
  return initialGameState;
}

// Used for creating hypothetical states within the minimax algorithm
// AND for mutating that actual game state
function generateNextGameState(gameState, move) {
  const newState = JSON.parse(JSON.stringify(gameState));

  newState.players[newState.activePlayer].moves.push(move);

  [newState.activePlayer, newState.waitingPlayer] = [newState.waitingPlayer, newState.activePlayer];
  return newState;
}

function getAvailableMoves(...unavailableMoves) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8]
    .filter(move => unavailableMoves.indexOf(move) < 0);
}

function checkForWin({ moves }) {
  return WINNING_PATTERNS.some(pattern =>
    pattern.every(move => moves.includes(move)));
}

function getWinner(gameState) {
  const winner = Object.entries(gameState.players).find(player => checkForWin(player[1]));
  return winner && gameState.players[winner[0]];
}

function checkForGameOver(gameState) {
  return Object.entries(gameState.players).some(player => checkForWin(player[1]))
    || getAvailableMoves(...gameState.players.X.moves, ...gameState.players.Y.moves).length === 0;
}

module.exports = {
  defineSettings,
  generateNextGameState,
  getAvailableMoves,
  checkForWin,
  getWinner,
  checkForGameOver,
};
