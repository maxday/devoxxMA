'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-nightwatch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var pkg = grunt.file.readJSON('package.json')

  var myCustomHeader = grunt.option('myCustomHeader') || 'gruntPower';
  var shouldLog = grunt.option('shouldLog') || false;

  grunt.initConfig({
    connect: {
      server: {
        options: {
          //keepalive: true,
          port: 9000,
          livereload: 35729,
          hostname: 'localhost',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              if (shouldLog) {
                grunt.log.writeln("request = " + req.url);
              }
              res.setHeader('X-MyCustomHeader', myCustomHeader);
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
      },
      dist: {
        options: {
          base: 'dist'
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
          'header.css', 'footer.css', 'index.html'
        ]
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
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
    },

    imagemin: {
      static: {
        options: {
          optimizationLevel: 1,
        },
        files: {
          'generatedImages/pic1.jpg': 'images/pic1.jpg',
          'generatedImages/pic2.jpg': 'images/pic2.jpg',
          'generatedImages/pic3.jpg': 'images/pic3.jpg'
        }
      }
    },

    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            }
          }
        }
      }
    },

    usemin: {
      html: ['dist/index.html'],
      css: ['styles/*.css'],
      js: ['js/*.js']
    },

    copy: {
      html: {
        src: 'index.html',
        dest: 'dist/index.html'
      },
      images: {
        cwd: 'generatedImages/',
        src: '*.jpg',
        dest: 'dist/images/',
        expand: true
      }
    },

    jshint: {
      files: ['js/*.js'],
      options: {
        curly: true,
        eqeqeq: true
      }
    },

    compress: {
      main: {
        options: {
          archive: 'release/' + pkg.name + '-' + pkg.version + '.zip'
        },
        files: [{
          src: ['dist/**']
        }]
      }
    },

    clean: {
      build: ['dist', 'generatedImages']
    }

  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'run'
    ]);
  });

  grunt.registerTask('build', [
    'compass',
    'copy:html',
    'copy:images',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'imagemin',
    'usemin',
    'jshint',
    'compress'
  ])

  grunt.registerTask('test', [
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('e2e', [
    'connect:test',
    'nightwatch'
  ]);

  grunt.registerTask('run', [
    'compass',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', [
    'run'
  ])
};
