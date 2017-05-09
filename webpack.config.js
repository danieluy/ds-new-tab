const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, '/src/main.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/build/'),
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.js$/,

        // Options to configure babel with
        query: {
          // plugins: ['transform-runtime'],
          presets: ['es2015']
        }
      },
    ]
  }
}