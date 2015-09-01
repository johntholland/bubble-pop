module.exports = function()
{
	var config = 
	{
		sourceJSFiles: ['./source/scripts/*.js'],
		sourceReactComponents: ['./source/scripts/ReactComponents/*.jsx'],
		sourceReactAppJsx: ['./source/app.jsx'],
		sourceAllReact: ['./source/scripts/ReactComponents/*.jsx','./source/app.jsx'],
		sourceHtml: ['./source/views/**/*.html'],
		sourceStyles: ['./source/styles/**/*.styl'],
		output_development: ['./output/output-development/'],
		output_production: ['./output/output-production/']
	};

	return config;
};