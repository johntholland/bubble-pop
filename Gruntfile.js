

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint :
        {
            options:{"esnext": true},
            files: ['./*.js']
        },

        uglify:
        {
            development:
            {
                files:
                {
                    './output/built.js': ['./*.js']
                }
            },
            options: 
            {
                mangle: false,
                beautify: true
            },
        },

        clean:
        {
            options:{},
            files: ['./output/built.js'],
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['jshint','clean', 'uglify']);

}; 