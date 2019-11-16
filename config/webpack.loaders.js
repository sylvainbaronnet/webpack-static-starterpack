const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rupture = require('rupture');
const config = require('./site.config');
const postcssConfig = require('./postcss.config.js');
const babelConfig = require('./babel.config.js');
/*
const twig = {
  test: /\.twig$/,
  use: [
    'raw-loader',
    {
      loader: 'twig-html-loader',
      options: {
        data: context => {
          const data = path.join(__dirname, 'data.json');
          context.addDependency(data); // Force webpack to watch file
          return context.fs.readJsonSync(data, {throws: false}) || {};
        },
      },
    },
  ],
};
*/
const html = {
  test: /\.html$/,
  include: path.join(__dirname, '../src/partials'),
  use: [
    {
      loader: 'html-loader',
      options: {
        interpolate: true,
      },
    },
  ],
};

const js = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: [
    config.env === 'production'
      ? {
          loader: 'webpack-strip-block',
          options: {
            start: '@debug',
            end: '@enddebug',
          },
        }
      : null,
    {
      loader: 'babel-loader',
      options: babelConfig,
    },
    {
      loader: 'eslint-loader',
      options: {
        configFile: `${config.paths.config}/eslint.config.js`,
      },
    },
  ].filter(Boolean),
};

const css = {
  test: /\.(styl|css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: 'css-loader', options: {importLoaders: 2}},
    {loader: 'postcss-loader', options: postcssConfig},
    {
      loader: 'stylus-loader',
      options: {
        define: {
          '$rem-root-value': config.style['rem-root-value'] || 1,
          '$theme-absolute-path': '',
          '$default-assets-path': config.style['default-assets-path'],
          '$default-fonts-path': config.style['default-fonts-path'],
          '$default-medias-path': config.style['default-medias-path'],
        },
        use: [rupture()],
      },
    },
  ],
};

const imageLoader = {
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
    mozjpeg: {
      progressive: true,
    },
  },
};

const images = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  exclude: /fonts/,
  use: [
    'file-loader?name=images/[name].[hash].[ext]',
    config.env === 'production' ? imageLoader : null,
  ].filter(Boolean),
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
  exclude: /images/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[hash].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

const videos = {
  test: /\.(mp4|webm)$/,
  use: [
    {
      loader: 'file-loader',
      query: {
        name: '[name].[hash].[ext]',
        outputPath: 'images/',
      },
    },
  ],
};

module.exports = [html, js, css, images, fonts, videos];
