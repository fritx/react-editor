'use strict'
const webpack = require('webpack')
const base = require('./webpack.config.base')
const config = module.exports = Object.assign({}, base)

config.entry = {
  'index.js': './src/index.js',
}

config.output = {
  path: 'dist/',
  filename: '[name]',
  libraryTarget: 'commonjs2',
}

// https://github.com/reactjs/react-redux/blob/master/webpack.config.js
// config.externals = {
//   'jquery': { commonjs2: 'jquery' },
//   'react': { commonjs2: 'react' },
//   'react-dom': { commonjs2: 'react-dom' },
// }

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.ExternalsPlugin('commonjs2', [
    'jquery', 'react', 'react-dom',
  ]),
  // commonjs不应压缩 影响sourcemap
  // new webpack.optimize.UglifyJsPlugin({
  //   compressor: {
  //     screw_ie8: true,
  //     warnings: false
  //   }
  // }),
])
