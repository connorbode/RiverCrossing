module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-debug', ['karma:debug']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    karma: {
      unit: { 
        configFile: 'karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'karma.conf.js',
        autoWatch: true
      },
      debug: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true,
        browsers: ['Chrome']
      }
    }
  });

};
