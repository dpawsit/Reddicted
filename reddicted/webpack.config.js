var webpack = require('webpack');
var path = require('path');

var build = path.resolve(__dirname, 'client/bundled');
var app= path.resolve(__dirname, 'client/app');

var config = {
  entry: app + '/index.jsx',
  output: {
    path: build,
    filename: 'bundle.js'
  },
   module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : app,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
