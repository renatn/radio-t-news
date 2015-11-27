'use strict';

var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'assets');

module.exports = {

  entry: {
    app: './app/main.js',
    vendor: ['react', 'flux']
  },

  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include: APP_PATH},
      {test: /\.css$/, loaders: ['style', 'css']},
    ],
    noParse: ['react']
  },

  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['', '.js']
  },

  watchOptions: {
    poll: true
  },

  devServer: {
    contentBase: ROOT_PATH,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    stats: { colors: true },
    proxy: [{
      path:   /\/api(.*)/,
      target:  'http://master.radio-t.com:8778'
    }]
  },

  // hotComponents: true,
  // devtool: 'eval',
  // debug: true,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    // new webpack.optimize.UglifyJsPlugin()
  ]

};