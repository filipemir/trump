module.exports = function(grunt) {
  return {
    files: grunt.config.get('watchFiles'),
    options: {
      jshintrc: true,
      reporter: require('jshint-stylish')
    }
  };
};