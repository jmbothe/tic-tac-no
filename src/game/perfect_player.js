const {
  generateNextGameState,
  getAvailableMoves,
  checkForWin,
  checkForGameOver,
} = require('./tic_tac_toe');

// checks base game state against hypothetical state so that minimax can
// determine scores based on which player is active in BASE state
// rather than who is active in hypothetical state
function getPlayerRoles(baseState, testState) {
  const activeBasePlayerMatchesActiveTestPlayer =
    testState.activePlayer === baseState.activePlayer;

  const currentPlayer = activeBasePlayerMatchesActiveTestPlayer
    ? testState.players[testState.activePlayer] : testState.players[testState.waitingPlayer];

  const waitingPlayer = activeBasePlayerMatchesActiveTestPlayer
    ? testState.players[testState.waitingPlayer] : testState.players[testState.activePlayer];

  return {
    currentPlayer,
    waitingPlayer,
    match: activeBasePlayerMatchesActiveTestPlayer,
  };
}

// evaluates game state for its utility for baseState active player,
// NOT hypothetical active player.
// Depth is a measure of the number of turns between baseState and testState.
// Including depth in the calculation ensures that blocking moves will
// be selected even in deadlocked games.
function getScore({ currentPlayer, waitingPlayer }, depth) {
  if (checkForWin(currentPlayer)) {
    return 10 - depth; // Positive value for a win for current player
  } else if (checkForWin(waitingPlayer)) {
    return depth - 10; // Negative value for a win for opponent
  }
  return 0; // Zero if game isn't over, or if it is a draw
}

function getBestMove(baseState, testState) {
  let choice;

  (function minimaxAlgorithm(baseState, testState, depth) {
    const playerRoles = getPlayerRoles(baseState, testState);

    if (checkForGameOver(testState)) {
      return getScore(playerRoles, depth);
    }

    depth += 1;
    const scores = [];
    const moves = getAvailableMoves(...testState.players.X.moves, ...testState.players.Y.moves);

    // generate scores from all possible next moves,
    // based on their effect on all possible future games
    moves.forEach((move) => {
      const nextTestState = generateNextGameState(testState, move);
      scores.push(minimaxAlgorithm(baseState, nextTestState, depth));
    });

    if (playerRoles.match) {
      // choose max score from all possible scores and update choice
      const indexOfMaxScore = scores.indexOf(Math.max(...scores));
      choice = moves[indexOfMaxScore];
      return scores[indexOfMaxScore];
    }
    // choose min score from all possible score sand update choice
    const indexOfMinScore = scores.indexOf(Math.min(...scores));
    choice = moves[indexOfMinScore];
    return scores[indexOfMinScore];
  }(baseState, testState, 0));

  return choice;
}

module.exports = {
  getPlayerRoles, // only exposed for testing purposes
  getScore, // only exposed for testing purposes
  getBestMove,
};
