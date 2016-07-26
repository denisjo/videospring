var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var pkg = require('./package.json');
var aliases = require('./aliases');
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: {
    app: './src/js/app.js',
    vendor: Object.keys(pkg.dependencies).filter(function(item) {return item.indexOf('babel') === -1})
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist', 'css'),
    filename: '../js/[name].min.js',
    pathinfo: false
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loaders:['eslint'],
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!less'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|eot|ttf|gif|svg|woff|woff2)$/,
        loader: "url?limit=10000&name=[name].[ext]"
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx'],
    alias: aliases
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor',
      '../js/[name].min.js'
    ),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      // This affects react lib size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name].min.css')
  ],
  postcss: function () {
    return [autoprefixer];
  }
};
