'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');

  //var myCustomHeader = grunt.option('myCustomHeader') || 'gruntPower';
  //var shouldLog = grunt.option('shouldLog') || false;

  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 9000,
          hostname: 'localhost',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              /*if (shouldLog) {
                grunt.log.writeln("request = " + req.url);
              }
              res.setHeader('X-MyCustomHeader', myCustomHeader);
              */
              res.setHeader('X-MyCustomHeader', 'helloDevoxx');
              next();
            });
            return middlewares;
          }
        }
      }
    },

    compass: {
      server: {
        options: {
          sourcemap: true,
          sassDir: 'styles',
          cssDir: 'styles'
        }
      }
    }

  });

  grunt.registerTask('run', [
    'compass',
    'connect:server'
  ]);

  grunt.registerTask('default', [
    'run'
  ])
};
