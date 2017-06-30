const ExtractTextPlugin = require('extract-text-webpack-plugin')
const externals = require('webpack-node-externals')
const path = require('path')

const eslintRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader'
}

module.exports = [
  {
    entry: './client',
    output: {
      path: path.resolve('dist'),
      filename: 'client.js'
    },
    devtool: 'cheap-source-map',
    module: {
      rules: [
        eslintRule,
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('client.css')
    ]
  },
  {
    entry: {
      server: './server',
      loader: './server/loader'
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js'
    },
    devtool: 'cheap-source-map',
    module: {
      rules: [
        eslintRule
      ]
    },
    target: 'node',
    externals: externals(),
    node: false
  }
]
