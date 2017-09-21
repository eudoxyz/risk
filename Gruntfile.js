module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {

      dist: {

        src: [

          'js/data.js',
          'js/boot.js',
          'js/load.js',
          'js/menu.js',
          'js/play.js',
          'js/game.js',

        ],

        dest: 'js/bundle.js'

      }

    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);

}
