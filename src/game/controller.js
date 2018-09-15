const colors = require('colors');
const inquirer = require('inquirer');
const { settingsPrompts, movePrompt } = require('./prompt_schemas');
const view = require('./view');
const { getBestMove } = require('./perfect_player');
const {
  defineSettings,
  generateNextGameState,
  getWinner,
  checkForGameOver,
} = require('./tic_tac_toe');

function handleGameOver(gameState) {
  view.showBoard(gameState);
  view.gameOver(getWinner(gameState));
  process.exit();
}

// called after every turn to determine if game should end or continue for next player
function routeNextMove(gameState) {
  if (checkForGameOver(gameState)) {
    handleGameOver(gameState);
  } else {
    play(gameState);
  }
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
  inquirer.prompt(movePrompt(gameState, playerSymbol))
    .then((answers) => {
      const updatedState = generateNextGameState(gameState, +answers.move);
      routeNextMove(updatedState);
    })
    .catch(() => {
      view.error();
      process.exit();
    });
}

function play(gameState) {
  const activePlayer = gameState.players[gameState.activePlayer];
  view.showBoard(gameState);
  if (!activePlayer.isHuman) {
    handleComputerMove(gameState, activePlayer.symbol);
  } else {
    handleHumanMove(gameState, activePlayer.symbol);
  }
}

function setupGame() {
  inquirer.prompt(settingsPrompts)
    .then(answers => play(defineSettings(answers)))
    .catch((error) => {
      console.log(error)
      view.error();
      process.exit();
    });
}

function initialize() {
  view.greeting();
  setupGame();
}

module.exports = {
  initialize,
};
