'use strict'
const webpack = require('webpack')
const base = require('./webpack.config.base')
const config = module.exports = Object.assign({}, base)

config.entry = {
  'index.js': './src/index.js',
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
])
