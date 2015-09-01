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
};

//function move() 
//{ 
//    var gulpSource;
//    if(args.html)
//    {
//        gulpSource = config.sourcelsHtml;
//    }
//    else if(args.jsx)
//    {
//        gulpSource = config.sourceReactComponents;
//    }

//    return gulp.src(gulpSource)
//    .pipe(gulp.dest('./output'));
//};

// function qualityControl()
// {
//     return gulp.src(config.sourceJSFiles)
//             .pipe($.if(args.verbose, $.print()))
//             .pipe($.jscs())
//             .pipe($.jshint())
//             .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
// };

function transform_move_jsx() 
{
    return gulp.src(config.sourceReactComponents)
    .pipe($.react())
    .pipe($.concat('react.js'))
    .pipe(gulp.dest('./source/scripts/'));
};

function merge_browserify_move_js()
{
    return gulp.src(config.sourceReactComponents)
    .pipe($.react())
    .pipe($.concat('app.js'))
    .pipe($.browserify({ insertGlobals: true }))
    .pipe(gulp.dest(config.output_development));
};

function transformStyls()
{
    return gulp.src(config.sourceStyles)
    .pipe($.stylus())
    .pipe($.concat('style.css'))
    .pipe(gulp.dest(config.output_development));
};

// function browserify() 
// { 
//     return gulp.src(config.sourceReactAppJsx)
//     .pipe($.react())
//     .pipe($.browserify({insertGlobals : true}))
//     .pipe(gulp.dest('./output'));
// };

function moveViews() 
{
    gulp.src(config.sourceHtml)
    .pipe(gulp.dest(config.output_development));
};

function move(source, destination)
{
    gulp.src(source)
    .pipe(gulp.dest(destination));
}
function moveViews(destination)
{
    move(config.sourceHtml, destination);
};

function moveJs(destination)
{
    move(config.sourceJs, destination);
};

// gulp.task('quality-control', qualityControl);
gulp.task('transform-move-jsx', transform_move_jsx);

gulp.task('transform-move-styls', transformStyls);
// gulp.task('browserify', browserify());

gulp.task('dev', ['transform-styls','transform-move-jsx']);
gulp.task('prod', ['transform-styls', 'transform-move-jsx']);
gulp.task('default', ['dev', 'prod']);

