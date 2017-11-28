const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const path = require('path')

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '.tmp'),
    filename: '[chunkhash].bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '.tmp'),
    historyApiFallback: true,
    inline: true,
    port: 3002
  }
})
