var paths = require('./paths');

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  var configs = {};
  configs.project = paths;
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    server: grunt.file.readJSON('package.json').main,
    watchFiles: [
      '*.js',
      `${paths.appDir}/**/*.js`,
      `${paths.grunt}/**/*.js`,
      `${paths.public}/**/*.js`
    ]
  });

  require('load-grunt-config')(grunt, {
    configPath: '/Users/filipem/gd/dev/trump/grunt',
    jitGrunt: {
      staticMappings: {
        express: 'grunt-express-server',
        shell: 'grunt-shell-spawn'
      }
    }
  });
};