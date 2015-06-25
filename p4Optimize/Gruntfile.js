module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	// grunt.loadNpmTask('');

	var config = grunt.file.readYAML("Gruntfile.yml");

	grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    
	});

	grunt.register.Task('default', [
		''
	]);
}
