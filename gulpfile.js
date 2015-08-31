var gulp = require('gulp');
var args = require('yargs');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

//jsx transform then concat to app.js
//javascript concat to app.js
//nodemodules concat to lib.js
//styl transform and concat to style.css 

function makeHTML(titleText, appjsFileName, styleFileName)
{
    var title = "<title>" + titleText + "</title>\n";
    var app = "<script type='text/javascript' src='./" + appjsFileName + "'></script>\n";
    var styling = "<link rel='stylesheet' type='text/css' href='" + styleFileName + "'> \n"; 
    var head = "<head>\n" + title + app + styling +"</head> \n\n";
    var body = "<body>\n <div id='anchor'></div>\n</body>\n";
    var htmlString = "<!DOCTYPE html> \n" + "<html>\n"+ head + body +" </html>";

    return htmlString;
}

function move(thingToMove) 
{ 
    return gulp.src(thingToMove)
    .pipe(gulp.dest('./output'));
}

function qualityControl()
{
    return gulp.src(config.sourceJSFiles)
            .pipe($.if(args.verbose, $.print()))
            .pipe($.jscs())
            .pipe($.jshint())
            .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
}

var transformJsx = function() 
{ 
    return gulp.src(config.sourceReactComponents)
    .pipe($.react())
    .pipe(gulp.dest('./output/development-output/'));
}

function transformStyls() 
{ 
    return gulp.src(config.sourceStyles)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.stylus())
    .pipe(gulp.dest('./output'));
}

function browserify() 
{ 
    return gulp.src(config.sourceReactAppJsx)
    .pipe($.react())
    .pipe($.browserify({insertGlobals : true}))
    .pipe(gulp.dest('./output'));
}


gulp.task('quality-control', qualityControl);
gulp.task('transformJsx', transformJsx());
gulp.task('move-html', move("html"));
gulp.task('transformStyls', transformStyls());
gulp.task('browserify', browserify());

gulp.task('dev', ['transform-styls', 'move-html','transform-react-appjsx','transform-react-components']);
