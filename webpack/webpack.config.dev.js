const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const client = require('./webpack.config.client')

module.exports = {
  ...client,
  entry: [
    '@babel/polyfill',
    path.join(__dirname, '../src/index.jsx'),
    'react-hot-loader/patch',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js',
    globalObject: 'this',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    contentBase: '../static',
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
