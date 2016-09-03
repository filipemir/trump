module.exports = function(grunt) {
  return {
    dev: {
      options: {
        script: grunt.config.get('server'),
      }
    }
  };
};