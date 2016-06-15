const autoprefixer = require('autoprefixer')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const serverConfig = {
  devtool: 'source-map',
  entry: {
    server: './source/demo/server'
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('static/styles.css', { allChunks: true }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1', 'postcss'),
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1', 'postcss'),
        include: path.join(__dirname, 'styles.css')
      },
      {
        test: /\.json/,
        loader: 'json'
      }
    ]
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  target: 'node',
  externals: nodeModules,
  postcss: function () {
    return [autoprefixer]
  }
}

const clientConfig = {
  devtool: 'source-map',
  entry: {
    client: './source/demo/client'
  },
  output: {
    path: 'build',
    filename: 'static/[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1', 'postcss'],
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?importLoaders=1'],
        include: path.join(__dirname, 'styles.css')
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
}

module.exports = [clientConfig, serverConfig]