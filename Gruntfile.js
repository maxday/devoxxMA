'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nightwatch');

  //var myCustomHeader = grunt.option('myCustomHeader') || 'gruntPower';
  //var shouldLog = grunt.option('shouldLog') || false;

  grunt.initConfig({
    connect: {
      server: {
        options: {
          //keepalive: false,
          port: 9000,
          livereload: 35729,
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
      },
      test: {
        options: {
          port: 9001,
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
    },

    watch: {
      compass: {
        files: ['styles/header.scss', 'styles/footer.scss'],
        tasks: ['compass:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.server.options.livereload %>'
        },
        files: [
          'styles/*', 'index.html'
        ]
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun : true
      }
    },

    nightwatch: {
      options: {
        standalone: true,
        //downlad if not found
        jar_version: '2.44.0',
        jar_path: 'test-e2e/selenium-server-standalone-2.44.0.jar',
        src_folders: ['test-e2e'],
        output_folder: 'report',
        test_settings: {
          default: {
            desiredCapabilities: {
              browserName: "chrome",
              javascriptEnabled: true,
            }
          }
        },
        selenium: {
          cli_args: {
            "webdriver.chrome.driver": "test-e2e/chromedriver"
          }
        }
      }
    }

  });

  grunt.registerTask('run', [
    'compass',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', [
    'run'
  ]);

  grunt.registerTask('test', [
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('e2e', [
    'connect:test',
    'nightwatch'
  ]);

};
