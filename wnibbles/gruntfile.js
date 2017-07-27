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
          src: ["client/\*\*/\*.ts", "!src/.baseDir.ts"],
          out: "./dist/app-build.js"
        }],
        files: [{
          src: ["src/*.ts", "!src/.baseDir.ts"],
          dest: "./dist/"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: true,
          rootDir: "src"
         }
      }
    },
    watch: {
      ts: {
        files: [{
          src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
          dest: "./dist"
        }],
        tasks: ["ts", "clean"]
      },
      views: {
        files: ["views/**/*.pug"],
        tasks: ["copy"]
      }
    },
    clean: ['*.tmp.txt']
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", [
    "copy",
    "ts",
    "clean"
  ]);

};