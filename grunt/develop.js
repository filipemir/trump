module.exports = function(grunt) {
  grunt.registerTask(
    'develop',
    function() {
      grunt.task.run(['shell:seedDb', 'eslint', 'clean', 'webpack', 'cssmin', 'express:dev', 'watch']);
    }
  );
};