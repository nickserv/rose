const ExtractTextPlugin = require("extract-text-webpack-plugin");
const externals = require('webpack-node-externals');
const path = require('path');

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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
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
    target: 'node',
    externals: externals(),
    node: {
      __dirname: false
    }
  }
];
