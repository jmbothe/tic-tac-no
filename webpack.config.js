const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `${APP_DIR}/index.js`,
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },

  // watch: true,
  // watchOptions: {
  //   poll: 1000,
  // },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    stats: 'errors-only',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // need this rule to get semantic ui css import to work
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(['build']),
  ],
};
