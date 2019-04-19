const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackProgressBar = require('progress-bar-webpack-plugin');

var happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.css', '.scss'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      lib: path.resolve(__dirname, '../src/libs/'),
      util: path.resolve(__dirname, '../src/utils/'),
      mix: path.resolve(__dirname, '../src/mixins/'),
      page: path.resolve(__dirname, '../demo/pages/'),
      'vc-swipe-cell': path.resolve(__dirname, '../src/install.js')
    }
  },
  plugins: [
    // common plugin
    new VueLoaderPlugin(),
    // new HardSourceWebpackPlugin(),
    WebpackProgressBar({
      format: '[:bar] :percent',
      clear: false,
      width: 50
    }),
    new HappyPack({
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true
    }),

    // prod plugin
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          {
            // loader: 'babel-loader',
            loader: 'happypack/loader',
            options: {
              cacheDirectory: true
            }
          },
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            video: 'src'
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'fast-sass-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          // 放CDN有必要的
          name: '[name].[hash:6].[ext]',
          limit: 1024
        }
      }
    ]
  }
};
