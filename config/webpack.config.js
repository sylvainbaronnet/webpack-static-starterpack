const path = require('path');
const config = require('./site.config');
const rules = require('./webpack.loaders');
const plugins = require('./webpack.plugins');
const optimization = require('./webpack.optimization');
const figlet = require('figlet');

module.exports = {
  context: path.join(config.root, config.paths.src),
  entry: './index.js',
  output: {
    path: path.join(config.root, config.paths.dist),
    filename: '[name].js',
  },
  mode: ['production', 'development'].includes(config.env)
    ? config.env
    : 'development',
  devtool:
    config.env === 'production' ? 'hidden-source-map' : 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(config.root, config.paths.dist),
    watchContentBase: true,
    // hot: true,
    open: true,
    port: config.port,
    host: config.devHost,
  },
  module: {rules},
  plugins,
  optimization,
};

figlet.text(
  'Studio.gd',
  {
    font: 'poison',
  },
  (e, t) => console.log(t),
);
