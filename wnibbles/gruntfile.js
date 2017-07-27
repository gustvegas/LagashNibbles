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
            dest: "./dist/views"
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
          sourceMap: false,
          rootDir: "src"
         }
      }
    },
    watch: {
      ts: {
        files: [{
          src: ["src/\*\*/\*.ts"],
          dest: "./dist"
        }],
        tasks: ["ts", "browserify", "clean"]
      },
      views: {
        files: ["views/**/*.pug"],
        tasks: ["copy"]
      }
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
    },
    move: {
      test: {
        src: 'dist/server/routes/*',
        dest: 'dist/routes/'
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-move');

  grunt.registerTask("default", [
    "copy",
    "ts",
    "browserify",
    "move",
    "clean"
  ]);

};