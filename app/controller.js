const prompt = require('prompt');
const PROMPTS = require('./settings_prompts');
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
  const schema = {
    properties: {
      move: {
        description: 'Please choose an available space (Enter a number between 0 and 8)',
        type: 'string',
        conform: (data) => {
          return data.length === 1
          && /[0-8]/.test(data)
          && !gameState[0].moves.includes(+data)
          && !gameState[1].moves.includes(+data);
        },
        message: 'Please enter only a single number between 0 and 8. Also, please only select a space that is still available.',
        required: true,
        before: data => +data,
      },
    },
  };
  view.activePlayer(playerSymbol);

  prompt.get(schema, (err, result) => {
    const updatedState = generateNextGameState(gameState, result.move);
    routeNextMove(updatedState);
  });
}

function play(gameState) {
  const activePlayer = getActivePlayer(gameState);

  view.showBoard(gameState);

  if (!activePlayer.isHuman) {
    handleComputerMove(gameState, activePlayer.symbol);
  } else {
    handleHumanMove(gameState, activePlayer.symbol);
  }
}

function setupGame() {
  prompt.get(PROMPTS, (err, result) => {
    play(defineSettings(result));
  });
}

function initialize() {
  view.greeting();
  setTimeout(() => {
    setupGame();
  }, 2000);
}

module.exports = {
  initialize,
};
