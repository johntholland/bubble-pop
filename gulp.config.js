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
	};

	return config;
};