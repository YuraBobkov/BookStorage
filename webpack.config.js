const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src/'),
  devtool: debug ? 'source-map' : false,
  entry: './js/index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread'],
        },
      },
    ],
  },
  output: {
    path: __dirname + '/src/',
    // publicPath: '/src/',
    filename: 'bundle.js',
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      minimize: true,
      sourceMap: false,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};

