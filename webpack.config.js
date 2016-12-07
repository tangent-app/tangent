var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: "raw-loader" },
      { test: /\.js$/, include : APP_DIR, loader : 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

module.exports = config;