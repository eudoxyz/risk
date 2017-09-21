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
        dest: 'js/bundle_es6.js'
      }
    },

    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'js/bundle.js': 'js/bundle_es6.js'
        }
      }
    },

    uglify: {
      build: {
        src: 'js/bundle.js',
        dest: 'js/bundle.min.js'
      }
    },

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'babel', 'uglify']);

}
