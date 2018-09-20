const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  entry: [
    'react-hot-loader/patch',
  ],

  watch: true,
  watchOptions: {
    poll: 1000,
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    stats: 'errors-only',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
