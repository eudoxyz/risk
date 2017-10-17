module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'js/client.js',
          'js/helpers.js',
          'js/data.js',
          'js/boot.js',
          'js/load.js',
          'js/menu.js',
          'js/lobby.js',
          'js/setup.js',
          'js/game.js',
        ],
        dest: 'public/js/bundle_es6.js'
      }
    },

    babel: {
      options: {
        // sourceMap: true
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

    clean: ['js/bundle_es6.js', 'js/bundle.js'],

    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('prod', ['concat', 'babel', 'uglify', 'clean']);
  grunt.registerTask('default', ['concat']);

}
