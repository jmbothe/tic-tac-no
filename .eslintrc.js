module.exports = {
  settings: {
    'import/resolver': {
      'babel-module': {
        root: '.',
      },
    },
  },
    extends: 'airbnb',
    env: {
      browser: true
    },
    parser: 'babel-eslint',
    rules: {
      'react/jsx-filename-extension': 0,
      'import/extensions': 0,
      'no-confusing-arrow': 0,
      'react/destructuring-assignment': 0,
      'implicit-arrow-linebreak': 0,
      'react/jsx-wrap-multilines': 0,
      'arrow-parens': 0
    }
};