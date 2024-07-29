const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist-server'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  resolve: {
    fallback: {
      "http": false,
      "https": false,
      "zlib": false,
      "stream": false,
      "util": false,
      "buffer": false,
      "asset": false,
      "crypto": false,
      "url": false,
      "querystring": false,
      "os": false,
      "path": false,
      "vm": false,
      "tls": false,
      "net": false,
      "fs": false,
      "child_process": false,
      "async_hooks": false,
      "http2": false,
    }
  },
};
