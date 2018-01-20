const colors = require('colors');
const prompt = require('prompt');
const { settingsPrompts, movePrompt } = require('./prompt_schemas');
const view = require('./view');
const { getBestMove } = require('./perfect_player');
const {
  defineSettings,
  generateNextGameState,
  getActivePlayer,
  getWinner,
  checkForGameOver,
} = require('./tic_tac_toe');

prompt.message = '';
prompt.delimiter = '';

function handleGameOver(gameState) {
  view.showBoard(gameState);
  view.gameOver(getWinner(gameState));
  process.exit();
}

// called after every turn to determine if game should end or continue for next player
function routeNextMove(gameState) {
  if (checkForGameOver(gameState)) handleGameOver(gameState);
  play(gameState);
}

function handleComputerMove(gameState, playerSymbol) {
  view.pleaseWait(playerSymbol);

  const bestMove =
    getBestMove(gameState, JSON.parse(JSON.stringify(gameState)));
  const updatedState = generateNextGameState(gameState, bestMove);

  setTimeout(() => {
    routeNextMove(updatedState);
  }, 2500);
}

function handleHumanMove(gameState, playerSymbol) {
  prompt.get(movePrompt(prompt, gameState, playerSymbol), (err, result) => {
    if (err) {
      view.error();
      process.exit();
    }
    const updatedState = generateNextGameState(gameState, result.move);
    routeNextMove(updatedState);
  });
}

function play(gameState) {
  const activePlayer = getActivePlayer(gameState);
  view.showBoard(gameState);
  if (!activePlayer.isHuman) handleComputerMove(gameState, activePlayer.symbol);
  handleHumanMove(gameState, activePlayer.symbol);
}

function setupGame() {
  prompt.get(settingsPrompts(prompt), (err, result) => {
    if (err) {
      view.error();
      process.exit();
    }
    play(defineSettings(result));
  });
}

function initialize() {
  view.greeting();
  setupGame();
}

module.exports = {
  initialize,
};
