const { assert } = require('chai');
const ticTacToe = require('./app/tic_tac_toe');
const perfectPlayer = require('./app/perfect_player');

/* *****************
MODEL TESTS
******************* */

describe('ticTacToe.generateNextGameState()', () => {
  const game = [
    {
      moves: [],
      symbol: 'X',
      isHuman: true,
      isActive: true,
    },
    {
      moves: [],
      symbol: 'O',
      isHuman: false,
      isActive: false,
    },
  ];
  it('should return an array', () => {
    assert.typeOf(ticTacToe.generateNextGameState(game, 0), 'array');
  });
  it('should not mutate the original game state', () => {
    const gameCopy = JSON.parse(JSON.stringify(game));
    ticTacToe.generateNextGameState(game, 0);
    assert.deepEqual(gameCopy, game);
  });
  it('should add a number to current player\'s array', () => {
    const newState = ticTacToe.generateNextGameState(game, 0);
    assert.typeOf(newState[0].moves[0], 'number');
    assert.equal(newState[0].moves[0], 0);
  });
  it('should change the current player', () => {
    const newState = ticTacToe.generateNextGameState(game, 0);
    assert(newState[1].isActive);
  });
});

describe('ticTacToe.getAvailableMoves', () => {
  const game = [
    {
      moves: [0, 1],
    },
    {
      moves: [2, 3],
    },
  ];
  it('should return an array', () => {
    assert.typeOf(ticTacToe.getAvailableMoves(...game[0].moves, ...game[1].moves), 'array');
  });
  it('should return an array containing all available moves', () => {
    assert.deepEqual(ticTacToe.getAvailableMoves(...game[0].moves, ...game[1].moves), [4, 5, 6, 7, 8]);
  });
  it('should not return an array containing any unavailable moves', () => {
    for (let i = 0; i < 4; i += 1) {
      assert.isNotOk(ticTacToe.getAvailableMoves(...game[0].moves, ...game[1].moves).includes(i));
    }
  });
});

describe('ticTacToe.checkForWin()', () => {
  const player = { moves: [] };
  it('should return a boolean value', () => {
    assert.typeOf(ticTacToe.checkForWin(player), 'boolean');
  });
  it('should return false if there is no winning arrangement of plays', () => {
    assert.isNotOk(ticTacToe.checkForWin(player));

    player.moves = [6, 0, 2, 8];
    assert.isNotOk(ticTacToe.checkForWin(player));
  });
  it('should return true for a winning arrangement of plays', () => {
    player.moves = [4, 0, 2, 8];
    assert.equal(ticTacToe.checkForWin(player), true);
  });
});

describe('ticTacToe.getWinner()', () => {
  const game = [
    {
      moves: [0, 1, 2],
      symbol: 'X',
      isHuman: true,
      isActive: true,
    },
    {
      moves: [],
      symbol: 'O',
      isHuman: false,
      isActive: false,
    },
  ];
  it('should return a player object', () => {
    assert.typeOf(ticTacToe.getWinner(game), 'object');
    assert(ticTacToe.getWinner(game).hasOwnProperty('moves'));
    assert(ticTacToe.getWinner(game).hasOwnProperty('symbol'));
    assert(ticTacToe.getWinner(game).hasOwnProperty('isHuman'));
    assert(ticTacToe.getWinner(game).hasOwnProperty('isActive'));
  });
});

describe('ticTacToe.checkForGameOver()', () => {
  const game = [
    {
      moves: [0, 1, 2],
      symbol: 'X',
      isHuman: true,
      isActive: true,
    },
    {
      moves: [],
      symbol: 'O',
      isHuman: false,
      isActive: false,
    },
  ];
  it('should return a boolean value', () => {
    assert.typeOf(ticTacToe.checkForGameOver(game), 'boolean');
  });
  it('should return true if there is a winner, or if game is tied', () => {
    assert(ticTacToe.checkForGameOver(game));

    game[0].moves = [1, 3, 5, 7];
    game[1].moves = [0, 2, 4, 6, 8];
    assert(ticTacToe.checkForGameOver(game));
  });
});

describe('ticTacToe.getActivePlayer()', () => {
  const game = [
    {
      moves: [0, 1, 2],
      symbol: 'X',
      isHuman: true,
      isActive: true,
    },
    {
      moves: [],
      symbol: 'O',
      isHuman: false,
      isActive: false,
    },
  ];
  it('should return a player object', () => {
    assert.typeOf(ticTacToe.getActivePlayer(game), 'object');
    assert(ticTacToe.getActivePlayer(game).hasOwnProperty('moves'));
    assert(ticTacToe.getActivePlayer(game).hasOwnProperty('symbol'));
    assert(ticTacToe.getActivePlayer(game).hasOwnProperty('isHuman'));
    assert(ticTacToe.getActivePlayer(game).hasOwnProperty('isActive'));
  });
})

describe('ticTacToe.getWaitingPlayer()', () => {
  const game = [
    {
      moves: [0, 1, 2],
      symbol: 'X',
      isHuman: true,
      isActive: true,
    },
    {
      moves: [],
      symbol: 'O',
      isHuman: false,
      isActive: false,
    },
  ];
  it('should return a player object', () => {
    assert.typeOf(ticTacToe.getWaitingPlayer(game), 'object');
    assert(ticTacToe.getWaitingPlayer(game).hasOwnProperty('moves'));
    assert(ticTacToe.getWaitingPlayer(game).hasOwnProperty('symbol'));
    assert(ticTacToe.getWaitingPlayer(game).hasOwnProperty('isHuman'));
    assert(ticTacToe.getWaitingPlayer(game).hasOwnProperty('isActive'));
  });
})

describe('perfectPlayer.getPlayerRoles()', () => {
  const currentState = [
    {
      symbol: 'X',
      isActive: true,
    },
    {
      symbol: 'O',
      isActive: false,
    },
  ];
  const testState = [
    {
      symbol: 'X',
      isActive: false,
    },
    {
      symbol: 'O',
      isActive: true,
    },
  ];
  it('should return an object', () => {
    assert.typeOf(perfectPlayer.getPlayerRoles(currentState, testState), 'object');
  });
  it('should return test players corresponding to their roles in current state', () => {
    assert.equal(perfectPlayer.getPlayerRoles(currentState, testState).currentPlayer, testState[0]);
    assert.equal(perfectPlayer.getPlayerRoles(currentState, testState).waitingPlayer, testState[1]);
    assert.isNotOk(perfectPlayer.getPlayerRoles(currentState, testState).match);
  });
});

describe('perfectPlayer.getScore()', () => {
  const players = {
    currentPlayer: { moves: [] },
    waitingPlayer: { moves: [] },
  };
  const depth = 0;
  it('should return a number', () => {
    assert.typeOf(perfectPlayer.getScore(players, depth), 'number');
  });
  it('should return a positive number if active player has won', () => {
    players.currentPlayer.moves = [0, 1, 2];
    assert.isAbove(perfectPlayer.getScore(players, depth), 0);
  });
  it('should return a negative number if opponent has won', () => {
    players.currentPlayer.moves = [];
    players.waitingPlayer.moves = [0, 1, 2];
    assert.isBelow(perfectPlayer.getScore(players, depth), 0);
  });
});

describe('perfectPlayer.getBestMove()', () => {
  const game = [
    {
      moves: [4],
      symbol: 'X',
      isActive: false,
    },
    {
      moves: [8],
      symbol: 'O',
      isActive: true,
    },
  ];
  it('should return a number', () => {
    assert.typeOf(perfectPlayer.getBestMove(game, JSON.parse(JSON.stringify(game))), 'number');
  });
  it('should return a number between 0 and 8', () => {
    assert.isAtLeast(perfectPlayer.getBestMove(game, JSON.parse(JSON.stringify(game))), 0);
    assert.isAtMost(perfectPlayer.getBestMove(game, JSON.parse(JSON.stringify(game))), 8);
  });
});
