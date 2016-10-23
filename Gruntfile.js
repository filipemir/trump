const paths = require('./paths'),
  timeGrunt = require('time-grunt'),
  loadGruntConfig = require('load-grunt-config');

module.exports = function(grunt) {

  timeGrunt(grunt);

  const configs = {};
  configs.project = paths;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    server: grunt.file.readJSON('package.json').main,
    watchFiles: [
      `*.js`,
      `${paths.appDir}/**/*.js`,
      `${paths.grunt}/**/*.js`,
      `${paths.src.js}/**/*.js`,
      `${paths.src.css}/**/*.css`,
    ]
  });

  loadGruntConfig(grunt, {
    configPath: `${paths.grunt}`,
    jitGrunt: {
      staticMappings: {
        eslint: 'gruntify-eslint',
        express: 'grunt-express-server',
        shell: 'grunt-shell-spawn'
      }
    }
  });
};