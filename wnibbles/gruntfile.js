module.exports = function(grunt) {
    "use strict";
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        shell: {
            options: {
                stderr: true
            },
            install: {
                command: ['cd frontend', 'npm install', 'cd ..', 'cd nibbleAppTS', 'npm install', 'cd ..', 'cd nibbleAppjS', 'npm install'].join('&&'),
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
            updev: {
                command: 'docker-compose -f docker-compose-dev.yml up',
            },
            runlocal: {
                command: ['cd frontend', '(npm run local &) ', 'cd ..', 'cd nibbleAppTS', '(npm run local &)', 'cd ..', 'cd nibbleAppjS', '(npm run local &)'].join(' && '),
            },
            down: {
                command: 'docker-compose down --rmi all',
            }
        }
    });

    grunt.registerTask('default', [
        'shell:buildFrontEnd', 
        'shell:buildNibbleTS']);
    grunt.registerTask('install', ['shell:install']);
    grunt.registerTask('build', ['shell:build']);
    grunt.registerTask('run', [ 
        'shell:buildFrontEnd', 
        'shell:buildNibbleTS', 
        'shell:up']);
    grunt.registerTask('rundev', [ 
        'shell:buildFrontEnd', 
        'shell:buildNibbleTS', 
        'shell:updev']);
    grunt.registerTask('stop', ['shell:down']);
    grunt.registerTask('runlocal', [ 
        'shell:runlocal']);
}