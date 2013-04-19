module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['<config:jasmine.specs>','src/**/*js'],
      tasks: 'lint jasmine'
    },
    jasmine : {
      src : 'src/**/*.js',
      specs : 'spec/**/*.js'
    },
      globals: {
        jasmine : false,
        describe : false,
        beforeEach : false,
        expect : false,
        it : false,
        spyOn : false
      },
	  lint: {
	        files: ['src/**/*.js', 'spec/**/*.js']
	      },
    
  });

  grunt.loadNpmTasks('grunt-jasmine-runner');


  // Default task.
  grunt.registerTask('default', 'lint jasmine');

}