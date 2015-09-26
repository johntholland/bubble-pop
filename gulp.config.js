module.exports = function()
{
	var config = 
	{
	   sourceLibDependencies:
            ['./bower_components/lodash/dist/lodash.min.js',
              './bower_components/postal.js/lib/postal.min.js',
              './bower_components/three.js/three.min.js',
              './bower_components/react/react.js',
              './bower_components/oboe/dist/oboe-browser.min.js'],

      sourceHtml: './source/views/**/*.html',

	    sourceJS: './source/scripts/**/*.js',
	    sourceReactComponents: './source/scripts/ReactComponents/**/*.jsx',
	    sourceReactComponentsTransformed: './source/scripts/ReactComponents/**/*.js',

		sourceCss: './source/styles/**/*.css',
		sourceStyleFiles: './source/styles/StylusFiles/**/*.styl',
		sourceStyleFilesTransformed: './source/styles/StylusFiles/**/*.css',

		output_development: './output/output-development/',
		output_production: './output/output-production/'
	};

	return config;
};