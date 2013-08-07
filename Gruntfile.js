module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    watch: {
      html: {
        files: ['src/*.html']
      },
      js: {
        files: ['src/js/*.js']
      },
      options: {
        livereload: true,
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'src'
        }
      }
    }
  });

  // Default task
  grunt.registerTask('dev', ['connect', 'watch']);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
