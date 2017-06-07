const webpack = require('webpack');
const path = require('path');

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
        loader: "babel-loader",
        include: [
          path.join(__dirname, "/src/"),
        ],
        test: /\.jsx?$/,
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
}