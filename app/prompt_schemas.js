const settingsPrompts = [
  {
    type: 'list',
    name: 'firstPlayerIsHuman',
    message: 'Is first player human or computer?',
    choices: ['Human', 'Computer'],
    filter: input => input === 'Human',
  },
  {
    name: 'firstPlayerSymbol',
    message: 'Choose first player symbol (NO NUMBERS)',
    validate: (input) => {
      if (!(input.length === 1)) {
        return `"${input}" is invalid input. Too many characters.Please enter only a single non-numerical character.\n`;
      } else if (!(/\D/.test(input))) {
        return `"${input}" is invalid input. Please do not enter any numbers for player symbols.\n`
      }
      return true;
    },
  },
  {
    type: 'list',
    name: 'secondPlayerIsHuman',
    message: 'Is second player human or computer?',
    choices: ['Human', 'Computer'],
    filter: input => input === 'Human',
  },
  {
    name: 'secondPlayerSymbol',
    message: 'Choose second player symbol (NO NUMBERS)',
    validate: (input, answers) => {
      if (!(input.length === 1)) {
        return `"${input}" is invalid input. Too many characters. Please enter only a single non-numerical character.\n`;
      } else if (!(/\D/.test(input))) {
        return `"${input}" is invalid input. Please do not enter any numbers for player symbols.\n`;
      } else if (input === answers.firstPlayerSymbol) {
        return `"${input}" is already the first player's symbol. Please choose a different symbol.\n`;
      }
      return true;
    },
  },
  {
    type: 'list',
    name: 'activePlayer',
    message: 'Which player should go first?',
    choices: ['First Player', 'Second Player'],
    filter: input => (input === 'First Player' ? 0 : 1),
  },
];

function movePrompt(gameState, playerSymbol) {
  return [
    {
      name: 'move',
      message: `Player ${playerSymbol}, please choose an available space (enter a number between 0 and 8)`,
      validate: (input) => {
        if (!(input.length === 1)) {
          return `"${input}" is invalid input. Too many characters. Please enter only a single number between 0 and 8.\n`;
        } else if (!(/[0-8]/.test(input))) {
          return `"${input}" is invalid input. It is not a number between 0 and 8. Please try again.\n`;
        } else if (gameState[0].moves.includes(+input) || gameState[1].moves.includes(+input)) {
          return `Space ${input} is already taken. Please choose a different space on the board.\n`;
        }
        return true;
      },
    },
  ];
}

module.exports = { settingsPrompts, movePrompt };
