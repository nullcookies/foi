const path = require('path');
const webpack = require('webpack');
const config = require('config');
const env = process.env.NODE_ENV || 'development';
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './client/index'
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../../', 'client'),
      'node_modules'
    ],
    // alias: {
    //   Components: path.resolve('client/components/'),
    //   Services: path.resolve('client/services/')
    // }
  },
  output: {
    path: path.resolve('public'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve('client', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      },
      'foi': {
        'url': JSON.stringify(config.get('url')),
        'botName': JSON.stringify(config.get('telegram').username)
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|woff|eot|ttf)$/,
        loader: 'file-loader'
      }
    ]
  }
};
