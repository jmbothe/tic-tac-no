const view = require('./view');
const PROMPTS = require('./prompts');
const { getBestMove } = require('./perfect_player');
const {
  initialGameState,
  defineSettings,
  generateNextGameState,
  getActivePlayer,
  getWinner,
  checkForGameOver,
} = require('./tic_tac_toe');

function validateInput(gameState, conditions, input) {
  const invalidInput = conditions.find(condition => !condition.test(input, gameState));

  // returns 'undefined' if input meets all conditions, else returns an error message
  return invalidInput && invalidInput.message(input);
}

function promptUser(gameState, { prompt, conditions }, callback) {
  view.promptUser(prompt);

  process.stdin.once('data', (data) => {
    const formatedData = data.toString().trim();
    const errorMessage = validateInput(gameState, conditions, formatedData);

    if (!errorMessage) {
      console.clear();
      callback(formatedData);
    } else {
      view.error(errorMessage);
      promptUser(gameState, { prompt, conditions }, callback);
    }
  });
}

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
  view.activePlayer(playerSymbol);

  promptUser(gameState, PROMPTS[5], (data) => {
    const updatedState = generateNextGameState(gameState, +data);

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
  promptUser(initialGameState, PROMPTS[0], (firstPlayerIsHuman) => {
    defineSettings(0, 'isHuman', firstPlayerIsHuman === 'y');
    promptUser(initialGameState, PROMPTS[1], (firstPlayerSymbol) => {
      defineSettings(0, 'symbol', firstPlayerSymbol);
      promptUser(initialGameState, PROMPTS[2], (secondPlayerIsHuman) => {
        defineSettings(1, 'isHuman', secondPlayerIsHuman === 'y');
        promptUser(initialGameState, PROMPTS[3], (secondPlayerSymbol) => {
          defineSettings(1, 'symbol', secondPlayerSymbol);
          promptUser(initialGameState, PROMPTS[4], (player) => {
            defineSettings(player === '1' ? 0 : 1, 'isActive', true);

            play(initialGameState);
          });
        });
      });
    });
  });
}

function initialize() {
  view.greeting();
  setTimeout(() => {
    setupGame();
  }, 2000);
}

module.exports = {
  validateInput, // only exposed for testing purposes
  initialize,
};
