var gulp = require('gulp');
var args = require('yargs');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('hello-world', function () { console.log('Ourfirst helloworld in gulp!')});

gulp.task
('quality-control', 
	function () 
	{ 
		return gulp.src(config.sourceJSFiles)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
		console.log('Successfully completed quality-control check');
	}
);

gulp.task
('browserify-react', 
	function () 
	{ 
		return gulp.src(config.sourceReactAppJsx)
		.pipe($.react())
		.pipe($.browserify({
          insertGlobals : true
        }))
		.pipe(gulp.dest('./output'));

		console.log('Successfully transformed and moved jsx components');
	}
);

gulp.task
('transform-react-appjsx', 
	function () 
	{ 
		return gulp.src(config.sourceReactAppJsx)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.react())
		.pipe(gulp.dest('./output'));

		console.log('Successfully transformed and moved app jsx file');
	}
);

gulp.task
('transform-react-components', 
	function () 
	{ 
		return gulp.src(config.sourceReactComponents)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.react())
		.pipe(gulp.dest('./output'));

		console.log('Successfully transformed and moved app jsx file');
	}
);

gulp.task
('move-html', 
	function () 
	{ 
		return gulp.src(config.sourceHtml)
		.pipe($.if(args.verbose, $.print()))
		.pipe(gulp.dest('./output'));

		console.log('Successfully moved html views');
	}
);

gulp.task
('transform-styls', 
	function () 
	{ 
		return gulp.src(config.sourceStyles)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.stylus())
		.pipe(gulp.dest('./output'));

		console.log('Successfully transformed and moved styl styles');
	}
);

gulp.task
('dev', ['transform-styls', 'move-html','transform-react-appjsx','transform-react-components']);
