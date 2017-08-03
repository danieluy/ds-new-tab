const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '/src/index.js'),
    'ThumbnailsBackgroundService': path.join(__dirname, '/src/services/ThumbnailsBackgroundService.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/build/'),
  },
  module: {
    loaders: [
      {
        // rules: [
        //   {
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader']
        //   }
        // ],
        rules: [{
          test: /\.scss$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
        }]
      },
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.jsx?$/,
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}