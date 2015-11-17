'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 9000,
        }
      }
    }
    });

  grunt.registerTask('run', [
    'connect:server',
  ]);

  grunt.registerTask('default', [
    'run'
  ])
};
