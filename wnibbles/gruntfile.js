module.exports = function(grunt) {
    "use strict";
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        shell: {
            options: {
                stderr: false
            },
            buildFrontEnd: {
                command: ['cd frontend', 'grunt'].join('&&'),
            },
            buildNibbleTS: {
                command: ['cd nibbleAppTS', 'grunt'].join('&&'),
            },
            build: {
                command: 'docker-compose build',
            },
            up: {
                command: 'docker-compose up',
            },
            down: {
                command: 'docker-compose down --rmi all',
            }
        }
    });

    grunt.registerTask('default', [
        'shell:buildFrontEnd', 
        'shell:buildNibbleTS']);
    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('run', ['shell:up']);
    grunt.registerTask('stop', ['shell:down']);
}