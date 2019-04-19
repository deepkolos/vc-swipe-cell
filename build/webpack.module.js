const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base');
const pkgs = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

rm(path.resolve(__dirname, '../lib/'), e =>
  e ? console.error(e) : console.log('clean lib')
);

module.exports = function() {
  base.entry = './src/install.js';

  base.devtool = 'source-map';
  base.mode = 'development';

  base.output = {
    path: path.resolve(__dirname, '../lib'),
    filename: 'vc-swipe-cell.js',
    libraryExport: 'default',
    libraryTarget: 'umd'
  };

  base.plugins = [
    ...base.plugins,
    new MiniCssExtractPlugin({
      filename: 'vc-swipe-cell.css',
      chunkFilename: 'vc-swipe-cell.css'
    }),
    new webpack.DefinePlugin({
      'process.VERSION': JSON.stringify(pkgs.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ];

  return base;
};
