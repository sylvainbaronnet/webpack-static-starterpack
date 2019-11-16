const path = require('path');
const fs = require('fs');

const ROOT = process.env.PWD || process.cwd();

const config = {
  // website's name, used for title, manifest and favicon meta tags
  siteName: 'MyElis',
  siteShortName: 'MyElis', // for manifest
  backgroundColor: '#ffffff', // for manifest
  crossorigin: 'use-credentials', //can be null, use-credentials or anonymous

  // website's description, used for favicon meta tags
  siteDescription: '',

  // Google Analytics tracking ID (leave blank to disable)
  googleAnalyticsUA: '',

  // viewport meta tag added to your HTML page's <head> tag
  viewport: 'width=device-width,initial-scale=1',

  // Source file for favicon generation. 512x512px recommended.
  favicon: path.join(ROOT, '/src/assets/medias/favicon.png'),

  devHost: 'localhost',
  port: process.env.PORT || 8000,
  env: process.env.NODE_ENV,
  root: ROOT,
  paths: {
    config: 'config',
    src: 'src',
    dist: 'dist',
  },
  package: JSON.parse(
    fs.readFileSync(path.join(ROOT, '/package.json'), {encoding: 'utf-8'}),
  ),
  style: {
    'default-assets-path': './assets/',
    'default-fonts-path': './fonts',
    'default-medias-path': './medias',
    'rem-root-value': 1,
  },
};

module.exports = config;
