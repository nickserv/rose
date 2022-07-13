const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const externals = require('webpack-node-externals')
const path = require('path')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = [
  {
    mode: devMode ? 'development' : 'production',
    entry: './client',
    output: {
      path: path.resolve('dist'),
      filename: 'client.js'
    },
    devtool: 'cheap-source-map',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin()
    ]
  },
  {
    mode: devMode ? 'development' : 'production',
    entry: {
      server: './server',
      loader: './server/loader'
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js'
    },
    devtool: 'cheap-source-map',
    target: 'node',
    externals: externals(),
    node: false
  }
]
