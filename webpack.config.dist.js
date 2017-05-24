const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, '/src/index.js')
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