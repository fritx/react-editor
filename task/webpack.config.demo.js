'use strict'
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const base = require('./webpack.config.base')
const config = module.exports = Object.assign({}, base)

config.entry = {
  'demo.js': './demo/index.js',
}

config.output = {
  path: 'dist/',
  filename: '[name]'
}

config.plugins = config.plugins.concat([
  new HtmlPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
])
