const _ = require('lodash'),
  paths = require('./paths'),
  timeGrunt = require('time-grunt');

module.exports = function(grunt) {

  timeGrunt(grunt);

  const pkg = grunt.file.readJSON('package.json'),
    server = grunt.file.readJSON('package.json').main,
    watchFiles = [
      `${paths.appDir}/**/*.js`,
      `${paths.grunt}/**/*.js`,
      `${paths.src.js}/**/*.js`,
      `${paths.src.css}/**/*.css`,
    ],
    eslintFiles = _.filter(watchFiles, (value) => {
      return /\.js$/.test(value)
    });

  grunt.initConfig({
    pkg,

    server,

    clean: {
      all: {
        src: [`${paths.dist.rootDir}/*`]
      }
    },

    copy: {
      files: {
        src: `${paths.src.img}/face.jpg`,
        dest: `${paths.dist.img}/trump.jpg`,
      }
    },

    cssmin: {
      default: {
        files: {
          [`${paths.dist.css}/index.min.css`]: `${paths.src.css}/index.css`
        }
      }
    },

    eslint: {
      src: eslintFiles
    },

    express: {
      default: {
        options: {
          script: server,
        }
      }
    },

    shell: {
      dropDb: {
        command: 'mongo trump --eval "db.dropDatabase()"'
      },
      seedDb: {
        command: `mongoimport -d trump -c quotes --drop ${paths.appDir}/trumpisms.json --jsonArray`
      }
    },

    uglify: {
      default: {
        files: {
          [`${paths.dist.js}/trump.min.js`]: `${paths.dist.js}/trump.js`
        }
      }
    },

    watch: {
      files: watchFiles,
      tasks: ['eslint', 'webpack', 'cssmin']
    },

    webpack: {
      default: {
        entry: `${paths.src.js}/index.js`,
        output: {
          path: `${paths.dist.js}`,
          filename: 'trump.js'
        },
        module: {
          loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules)/,
            query: { presets: ['es2015'] }
          }]
        }
      }
    }
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask(
    'develop', ['eslint', 'clean', 'webpack', 'cssmin', 'copy', 'express', 'watch']
  );
  grunt.registerTask('default', 'develop');
  grunt.registerTask('db-seed', 'shell:seedDb');
  grunt.registerTask('db-drop', 'shell:dropDb');
  grunt.registerTask(
    'build',
    "Concatenates and stacks the page's javascript code",
    function() {
      grunt.task.run(['clean', 'webpack', 'uglify', 'cssmin', 'copy']);
    }
  );
};