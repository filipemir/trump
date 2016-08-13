module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },
    jshint: {
      files: ['Gruntfile.js', '*.js', 'static/js/*.js' ],
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    },
    nodemon: {
      dev: {
        script: '<%= pkg.main %>'
      }
    },
    shell: {
      dropDb: {
        command: 'mongo trump --eval "db.dropDatabase()"'
      },
      seedDb: {
        command: 'mongoimport -d trump -c quotes --drop trumpisms.json --jsonArray'
      },
      initiateDb: {
        command: 'mongod',
        options: {
          async: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell-spawn');

  grunt.registerTask('dropDb', ['shell:initiateDb', 'shell:dropDb']);
  grunt.registerTask('seedDb', ['shell:initiateDb', 'shell:seedDb']);
  grunt.registerTask('initiateDb', ['shell:initiateDb']);
  grunt.registerTask('default', ['shell:seedDb', 'jshint', 'concurrent']);
};