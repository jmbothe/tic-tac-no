const prompt = require('prompt');

module.exports = {
  properties: {
    firstPlayerIsHuman: {
      description: 'Is First Player Human? (enter "y" or "n")',
      type: 'string',
      conform: data => data.length === 1 && /y|n/i.test(data),
      message: 'Please enter only a single character: "y" for Yes or "n" for No.',
      required: true,
      before: data => data === 'y',
    },
    firstPlayerSymbol: {
      description: 'What is First Player\'s Symbol? (NO NUMBERS)',
      type: 'string',
      conform: data => data.length === 1 && /\D/.test(data),
      message: 'Please enter only a single non-numerical character (for example, "X")',
      required: true,
    },
    secondPlayerIsHuman: {
      description: 'Is Second Player Human? (enter "y" or "n")',
      type: 'string',
      conform: data => data.length === 1 && /y|n/i.test(data),
      message: 'Please enter only a single character: "y" for Yes or "n" for No.',
      required: true,
      before: data => data === 'y',
    },
    secondPlayerSymbol: {
      description: 'What is Second Player\'s Symbol? (NO NUMBERS)',
      type: 'string',
      conform: (data) => {
        const firstPlayerSymbol = prompt.history('firstPlayerSymbol').value;
        return data.length === 1 && /\D/.test(data) && data !== firstPlayerSymbol;
      },
      message: 'Please enter only a single non-numerical character (for example, "X").\nAlso, please be sure you arent entering the first players symbol',
      required: true,
    },
    activePlayer: {
      description: 'Which player should go first? (enter "1" or "2")',
      type: 'string',
      conform: data => data.length === 1 && /1|2/.test(data),
      message: 'Please enter only a single character: "1" for first player or "2" for second player.',
      required: true,
      before: data => data === '1' ? 0 : 1,
    },
  },
};
