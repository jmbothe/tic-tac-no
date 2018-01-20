function settingsPrompts(prompt) {
  return {
    properties: {
      firstPlayerIsHuman: {
        description: '\nIs First Player Human? (enter "y" or "n")'.white,
        type: 'string',
        conform: data => data.length === 1 && /y|n/i.test(data),
        message: 'Please enter only a single character: "y" for Yes or "n" for No.',
        required: true,
        before: data => data === 'y',
      },
      firstPlayerSymbol: {
        description: '\nWhat is First Player\'s Symbol? (NO NUMBERS)'.white,
        type: 'string',
        conform: data => data.length === 1 && /\D/.test(data),
        message: 'Please enter only a single non-numerical character (for example, "X").',
        required: true,
      },
      secondPlayerIsHuman: {
        description: '\nIs Second Player Human? (enter "y" or "n")'.white,
        type: 'string',
        conform: data => data.length === 1 && /y|n/i.test(data),
        message: 'Please enter only a single character: "y" for Yes or "n" for No.',
        required: true,
        before: data => data === 'y',
      },
      secondPlayerSymbol: {
        description: '\nWhat is Second Player\'s Symbol? (NO NUMBERS)'.white,
        type: 'string',
        conform: (data) => {
          const firstPlayerSymbol = prompt.history('firstPlayerSymbol').value;
          return data.length === 1 && /\D/.test(data) && data !== firstPlayerSymbol;
        },
        message: 'Please enter only a single non-numerical character (for example, "X").\nAlso, please be sure you arent entering the first players symbol.',
        required: true,
      },
      activePlayer: {
        description: '\nWhich player should go first? (enter "1" or "2")'.white,
        type: 'string',
        conform: data => data.length === 1 && /1|2/.test(data),
        message: 'Please enter only a single character: "1" for first player or "2" for second player.',
        required: true,
        before: data => (data === '1' ? 0 : 1),
      },
    },
  };
}

function movePrompt(prompt, gameState, playerSymbol) {
  return {
    properties: {
      move: {
        description: (`Player ${playerSymbol}, please choose an available space (Enter a number between 0 and 8)`.yellow),
        type: 'string',
        conform: (data) => {
          return data.length === 1
          && /[0-8]/.test(data)
          && !gameState[0].moves.includes(+data)
          && !gameState[1].moves.includes(+data);
        },
        message: 'Please enter only a single number between 0 and 8. Also, please only select a space that is still available.\n',
        required: true,
        before: data => +data,
      },
    },
  };
}

module.exports = { settingsPrompts, movePrompt };
