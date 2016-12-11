const path = require('path');

module.exports = {
  rootDir: __dirname,
  appDir: path.join(__dirname, '/app'),
  nodeModules: path.join(__dirname, '/node_modules'),
  grunt: path.join(__dirname, '/grunt'),
  public: path.join(__dirname, '/public'),
  dist: {
    rootDir: path.join(__dirname, 'public/dist'),
    js: path.join(__dirname, 'public/dist/js'),
    css: path.join(__dirname, 'public/dist/css'),
    img: path.join(__dirname, 'public/dist/img')
  },
  src: {
    rootDir: path.join(__dirname, 'public/src'),
    js: path.join(__dirname, 'public/src/js'),
    css: path.join(__dirname, 'public/src/css'),
    img: path.join(__dirname, 'public/src/img')
  },
  temp: {
    rootDir: path.join(__dirname, 'public/temp'),
    js: path.join(__dirname, 'public/temp/js'),
    css: path.join(__dirname, 'public/temp/css'),
  },
  views: path.join(__dirname, '/app/views'),
  s3: {
    root: 's3.amazonaws.com/trump-says/'
  }
};