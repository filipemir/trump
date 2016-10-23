const _ = require('lodash'),
  paths = require('../paths');

module.exports = function(grunt) {
  const watchFiles = _.remove(grunt.config.get('watchFiles'), [`${paths.src.css}/**/*.css`]);
  return {
    src: watchFiles
  };
};






