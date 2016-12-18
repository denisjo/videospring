var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var aliases = require('./aliases');
var ROOT_PATH = path.resolve(__dirname);

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

var loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|jpeg|eot|ttf|gif|svg|woff|woff2)$/,
    loader: "url?limit=100000"
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

// In case we need to create the physical files for the development environment
if (process.env.NODE_ENV === 'build-dev') {
  loaders.push({
    test: /\.less/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
  });
  plugins.push(new ExtractTextPlugin('style.css'));
}
else {
  loaders.push({
    test: /\.less/,
    loader: "style!css!postcss!less",
    exclude: /node_modules/
  });
}

module.exports = {
  entry: [
    './src/js/app.js'
  ],
  output:{
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    loaders: loaders
  },
	devtool: 'inline-source-map',
	resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx','.json'],
    alias: aliases
	},
	devServer: {
    contentBase: 'build',
    port: "3000",
    colors: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
	},
	plugins: plugins,
  postcss: function () {
    return [autoprefixer];
  }
};
