module.exports = function(grunt) {
  grunt.registerTask(
    'develop',
    function() {
      grunt.task.run(['shell:seedDb', 'eslint', 'clean', 'webpack', 'cssmin', 'copy', 'express:dev', 'watch']);
    }
  );
};