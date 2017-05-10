const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/src/index.ts',
  output: {
    path : path.join(__dirname, '/server/dist'),
    filename : 'index.js'
  },

  resolve: {
    extensions: [".ts", ".js"],

    alias: {
      src: path.join(__dirname, '/server/src'),
      root: path.join(__dirname, '/')
    },
  },

  target: 'node',

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dva)\/).*/
      }
    ]
  },

  externals: [nodeExternals()],
};