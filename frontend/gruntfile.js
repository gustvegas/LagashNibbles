module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          },
          {
            expand: true,
            cwd: "./views",
            src: ["**"],
            dest: "./dist/server/views"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/server/\*\*/\*.ts"],
          dest: "./dist/"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
         }
      },
      client: {
        files: [{
          src: ["src/client/\*\*/\*.ts"],
          dest: "./tsjs/"
        }],
        options: {
          target: "es6",
          sourceMap: true,
          rootDir: "src",
         }
      }
    },
    watch: {
      ts: {
        files: ["./src"],
        tasks: ["ts", "browserify", "clean"]
      },
      ts2: {
        files: ["./dist"],
        tasks: ["browserify", "clean"]
      },
      views: {
        files: ["./views"],
        tasks: ["copy"]
      },
      public: {
        files: ["./public"],
        tasks: ["copy"]
      }
    },
    concurrent: {
        dev: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    nodemon: {
      dev: {
        script: './bin/www.js',
        options: {
          nodeArgs: ['-inspect']
        }
      },
      env: {
        PORT: '9090'
      },
    },
    clean: ['*.tmp.txt'],
    browserify: {
      dist: {
        files: {
          'dist/public/js/client.js': ['tsjs/client/**/*.js']
        },
        options: {
          transform: [["babelify", { "presets": ["es2015"] }]]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-move');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask("default", [
    "copy",
    "ts",
    "browserify",
    "clean"
  ]);

  grunt.registerTask("run", [
    "concurrent",
  ]);

};