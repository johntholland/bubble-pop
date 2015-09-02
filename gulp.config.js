module.exports = function()
{
	var config = 
	{
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