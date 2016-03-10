'use strict'
var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')
var Notifier = require('webpack-notifier')

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css?modules', exclude: /node_modules/ },
    ]
  },
  entry: './demo/index.js',
  output: {
    path: 'dist/',
    filename: 'index.js'
  },
  resolve: {
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite'
    // },
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new Notifier({ alwaysNotify: true }),
    new CleanPlugin(path.join(__dirname, 'dist')),
    new HtmlPlugin(),
  ]
}
