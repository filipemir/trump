const path = require('path');

module.exports = {
  rootDir: __dirname,
  appDir: path.join(__dirname, '/app'),
  quotesDir: path.join(__dirname, '/app', 'quotes'),
  nodeModules: path.join(__dirname, '/node_modules'),
  grunt: path.join(__dirname, '/grunt'),
  public: path.join(__dirname, '/public'),
  dist: {
    rootDir: path.join(__dirname, 'public/dist'),
    js: path.join(__dirname, 'public/dist/js'),
    css: path.join(__dirname, 'public/dist/css')
  },
  src: {
    rootDir: path.join(__dirname, 'public/src'),
    js: path.join(__dirname, 'public/src/js'),
    css: path.join(__dirname, 'public/src/css')
  },
  static: {
    rootDir: path.join(__dirname, 'public/static'),
    aud: path.join(__dirname, 'public/static/aud'),
    fonts: path.join(__dirname, 'public/static/fonts'),
    img: path.join(__dirname, 'public/static/img')
  },
  temp: {
    rootDir: path.join(__dirname, 'public/temp'),
    js: path.join(__dirname, 'public/temp/js'),
    css: path.join(__dirname, 'public/temp/css')
  },
  views: path.join(__dirname, '/app/views')
};