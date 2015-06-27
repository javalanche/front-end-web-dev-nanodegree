module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// grunt.loadNpmTask('');


	grunt.initConfig({

		uglify: {
			my_target: {
				files: {
					'dist/views/js/main.min.js': ['views/js/main.js'],
					'dist/views/js/perfmatters.min.js': ['js/perfmatters.js']
				}
			}
		},

		cssmin: {
			options: {
					shorthandCompacting: false,
					roundingPrecision: -1
				},
			target: {
				files: {
					'dist/views/css/main.min.css': ['css/style.css', 'css/print.css'],
					'dist/views/css/style.min.css': ['css/style.css'],
					'dist/views/css/style-pizzeria.min.css': ['views/css/style.css'],
					'dist/views/css/print.min.css': ['css/print.css']
				}
			}
		}
    
	});

	grunt.registerTask('default', [
		'uglify',
		'cssmin'
	]);
}
