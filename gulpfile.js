var gulp = require('gulp');
var args = require('yargs');
var config = require('./gulp.config.js')();
var streamqueue = require('streamqueue');
var $ = require('gulp-load-plugins')({lazy: true});

//nodemodules concat to lib.js

gulp.task('do-js', do_js);

function do_js(destination)
{
    var stream = streamqueue({ objectMode: true });
    stream.queue(gulp.src(config.sourceReactComponents)).pipe($.react());
    stream.queue(gulp.src(config.sourceJS));
    return stream.done()
            .pipe($.concat('app.js'))
            .pipe($.browserify({ insertGlobals: true }))
            .pipe(gulp.dest(destination));
}

//Code Quality Tasks
function qualityControl()
 {
     return gulp.src(config.sourceJSFiles)
             .pipe($.if(args.verbose, $.print()))
             .pipe($.jscs())
             .pipe($.jshint())
             .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
 };

//Styles.css
function do_css(destination)
{
    transform_styls();
    merge_move_css(destination);
    clean_intermediate_css_from_styl()
}

function transform_styls()
{
    return gulp.src(config.sourceStyleFiles)
    .pipe($.stylus())

    .pipe(gulp.dest('.'));
};

function merge_move_css(destination)
{
    return gulp.src(config.sourceCss)
    .pipe($.concat('style.css'))
    .pipe($.browserify({ insertGlobals: true }))
    .pipe(gulp.dest(destination));
};

function clean_intermediate_css_from_styl()
{
    return del([sourceStyleFilesTransformed]);
};

//App.js
function do_react(destination)
{
    transform_jsx();
    merge_browserify_move_js(destination);
    clean_intermediate_js_from_jsx();
}

function transform_jsx()
{
    return gulp.src(config.sourceReactComponents)
    .pipe($.react())
    .pipe(gulp.dest('.'));
};

function merge_browserify_move_js(destination)
{
    return gulp.src(config.sourceReactComponents)
    .pipe($.concat('app.js'))
    .pipe($.browserify({ insertGlobals: true }))
    .pipe(gulp.dest(destination));
};

function clean_intermediate_js_from_jsx()
{
    return del([sourceReactComponentsTransformed]);
};

//Lib.js
function do_js_libs(destination)
{
    merge_browserify_move_js_dependencies(destination);
}

function merge_browserify_move_js_dependencies(destination)
{
    return gulp.src(config.sourceReactComponents)
    .pipe($.concat('app.js'))
    .pipe($.browserify({ insertGlobals: true }))
    .pipe(gulp.dest(destination));
};

//Gulp Tasks

gulp.task('dev', do_js.bind(this, config.output_development));
//gulp.task('prod', [transform_move_jsx.bind(this, config.output_production)]);
//gulp.task('default', ['dev', 'prod']);

