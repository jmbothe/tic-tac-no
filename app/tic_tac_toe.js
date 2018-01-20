const WINNING_PATTERNS = require('./winning_patterns');

function defineSettings({
  firstPlayerSymbol,
  firstPlayerIsHuman,
  secondPlayerSymbol,
  secondPlayerIsHuman,
  activePlayer,
}) {
  // Don't actually need a board. Just need players' moves to test against winning patterns
  const initialGameState = [
    {
      moves: [],
      symbol: firstPlayerSymbol,
      isHuman: firstPlayerIsHuman,
      isActive: false,
    },
    {
      moves: [],
      symbol: secondPlayerSymbol,
      isHuman: secondPlayerIsHuman,
      isActive: false,
    },
  ];

  initialGameState[activePlayer].isActive = true;

  return initialGameState;
}

// Used for creating hypothetical states within the minimax algorithm
// AND for mutating that actual game state
function generateNextGameState(gameState, move) {
  const newState = JSON.parse(JSON.stringify(gameState));

  newState.find(player => player.isActive).moves.push(move);
  newState.forEach(player => player.isActive = !player.isActive);
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
  return gameState.find(player => checkForWin(player));
}

function checkForGameOver(gameState) {
  return gameState.some(player => checkForWin(player))
    || getAvailableMoves(...gameState[0].moves, ...gameState[1].moves).length === 0;
}

function getActivePlayer(gameState) {
  return gameState.find(player => player.isActive);
}

function getWaitingPlayer(gameState) {
  return gameState.find(player => !player.isActive);
}

module.exports = {
  defineSettings,
  generateNextGameState,
  getAvailableMoves,
  checkForWin,
  getWinner,
  checkForGameOver,
  getActivePlayer,
  getWaitingPlayer,
};
