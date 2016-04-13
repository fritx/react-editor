'use strict'
const path = require('path')
const webpack = require('webpack')
// const CleanPlugin = require('clean-webpack-plugin')
const Notifier = require('webpack-notifier')

module.exports = {
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css?modules', exclude: /node_modules/ },
    ]
  },
  output: {
    path: 'dist/',
    filename: '[name]'
  },
  resolve: {
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite'
    // },
    extensions: ['', '.js']
  },
  plugins: [
    new Notifier({ alwaysNotify: true }),
    new webpack.ExternalsPlugin('commonjs', [
      'path', 'fs', 'os',
    ]),
    // new CleanPlugin(path.join(__dirname, 'dist')),
  ]
}
