module.exports = function(grunt) {
  return {
    files: grunt.config.get(['watchFiles']),
    tasks: ['jshint']
  };
};