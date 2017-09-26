const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chunkhash].bundle.js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'APP_ENV': JSON.stringify('production')
    })
  ]
})
