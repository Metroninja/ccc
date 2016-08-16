const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?sourceMap'
]

module.exports = {
  entry: "js/app.js",
  module: {
    loaders: [
      { 
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  postcss: [
    autoprefixer(['last 2 versions']),
  ],
  resolve: {
    root: [
      process.cwd(),
    ],
  },
  watchOptions: {
    poll: true
  }
};