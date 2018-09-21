import WINNING_PATTERNS from 'src/game/winning_patterns';

// Don't actually need a board. Just need players' moves to test against winning patterns
export const initialGameState = {
  activePlayer: 'X',
  waitingPlayer: 'O',
  players: {
    X: {
      moves: [],
      isHuman: true,
      symbol: 'X',
    },
    O: {
      moves: [],
      isHuman: true,
      symbol: 'O',
    },
  },
};

/*
Used for creating hypothetical states within the minimax algorithm
AND for mutating that actual game state.
This method of deep copying turned out to be more performant
than using update() from immutability helper, or JSON.parse(JSON.stringify)
*/
export function generateNextGameState(gameState, move) {
  return {
    activePlayer: gameState.waitingPlayer,
    waitingPlayer: gameState.activePlayer,
    players: {
      X: {
        moves:
          gameState.activePlayer === 'X'
            ? gameState.players.X.moves.concat([move])
            : gameState.players.X.moves,
        isHuman: gameState.players.X.isHuman,
        symbol: 'X',
      },
      O: {
        moves:
          gameState.activePlayer === 'O'
            ? gameState.players.O.moves.concat([move])
            : gameState.players.O.moves,
        isHuman: gameState.players.O.isHuman,
        symbol: 'O',
      },
    },
  };
}

export function getAvailableMoves(...unavailableMoves) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
    move => unavailableMoves.indexOf(move) < 0,
  );
}

export function checkForWin({ moves }) {
  return WINNING_PATTERNS.some(pattern =>
    pattern.every(move => moves.includes(move)));
}

export function getWinner(gameState) {
  const winner = Object.entries(gameState.players).find(player =>
    checkForWin(player[1]));
  return winner && gameState.players[winner[0]].symbol;
}

export function checkForGameOver(gameState) {
  return (
    Object.entries(gameState.players).some(player => checkForWin(player[1]))
    || getAvailableMoves(
      ...gameState.players.X.moves,
      ...gameState.players.O.moves,
    ).length === 0
  );
}
