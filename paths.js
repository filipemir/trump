const path = require('path');

module.exports = {
  rootDir: __dirname,
  appDir: path.join(__dirname, '/app'),
  nodeModules: path.join(__dirname, '/node_modules'),
  grunt: path.join(__dirname, '/grunt'),
  public: path.join(__dirname, '/public'),
  dist: {
    rootDir: path.join(__dirname, '/public/dist'),
    js: path.join(__dirname, '/public/dist/js'),
    css: path.join(__dirname, '/public/dist/css'),
  },
  src: {
    rootDir: path.join(__dirname, '/public/src'),
    js: path.join(__dirname, '/public/src/js'),
    css: path.join(__dirname, '/public/src/css'),
  },
  views: path.join(__dirname, '/app/views')
};