module.exports = [
  {
    prompt: 'Is First Player Human? (enter "y" or "n")',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `\n"${input}" is invalid input. Too many characters.\nPlease enter only a single character: either "y" for Yes or "n" for No.\n`,
      },
      {
        test: input => /y|n/.test(input),
        message: input => `\n"${input}" is invalid input. Please enter either "y" for Yes or "n" for No.\n`,
      },
    ],
  },
  {
    prompt: 'What is First Player\'s Symbol? (NO NUMBERS)',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `\n"${input}" is invalid input. Too many characters.\nPlease enter only a single non-numerical character.\n`,
      },
      {
        test: input => /\D/.test(input),
        message: input => `\n"${input}" is invalid input. Please do not enter any numbers for player symbols.\n`,
      },
    ],
  },
  {
    prompt: 'Is Second Player Human? (enter "y" or "n")',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `\n"${input}" is invalid input. Too many characters.\nPlease enter only a single character: either "y" for Yes or "n" for No.\n`,
      },
      {
        test: input => /y|n/.test(input),
        message: input => `\n"${input}" is invalid input. Please enter either "y" for Yes or "n" for No.\n`,
      },
    ],
  },
  {
    prompt: 'What is Second Player\'s Symbol? (NO NUMBERS)',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `"${input}" is invalid input. Too many characters.\nPlease enter only a single non-numerical character.\n`,
      },
      {
        test: input => /\D/.test(input),
        message: input => `\n"${input}" is invalid input. Please do not enter any numbers for player symbols.\n`,
      },
      {
        test: (input, gameState) => gameState[0].symbol !== input,
        message: input => `\n"${input}" is already the first player's symbol. Please choose a different symbol.\n`,
      },
    ],
  },
  {
    prompt: 'Which player should go first? (enter "1" or "2")',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `\n"${input}" is invalid input. Too many characters.\nPlease enter only a single character: either "1" for First Player or "2" for Second Player.\n`,
      },
      {
        test: input => /1|2/.test(input),
        message: input => `\n"${input}" is invalid input.  Please try again.\nEnter "1" for First Player or "2" for Second Player.\n`,
      },
    ],
  },
  {
    prompt: 'Please choose an available space (enter a number between 0 and 8)',
    conditions: [
      {
        test: input => input.length === 1,
        message: input => `\n"${input}" is invalid input. Too many characters.\nPlease enter only a single number between 0 and 8.\n`,
      },
      {
        test: input => /[0-8]/.test(input),
        message: input => `\n"${input}" is invalid input. It is not a number between 0 and 8. Please try again.\n`,
      },
      {
        test: (input, gameState) => !gameState[0].moves.includes(+input) && !gameState[1].moves.includes(+input),
        message: input => `\nSpace ${input} is already taken. Please choose a different space on the board.\n`,
      },
    ],
  },
];
