module.exports = function(grunt) {
  grunt.registerTask(
    'build',
    "Concatenates and stacks the page's javascript code",
    function() {
      grunt.task.run(['eslint', 'clean', 'webpack', 'uglify']);
    }
  );
};