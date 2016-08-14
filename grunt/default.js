module.exports = function(grunt) {
  grunt.registerTask(
    'default', 
    function() {
      grunt.task.run(['shell:seedDb', 'jshint', 'express:dev', 'watch']);
    }
  );
};