const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const path = require('path')

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '.tmp'),
    filename: '[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
})
