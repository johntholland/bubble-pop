var gulp = require('gulp');
var args = require('yargs');
var config = require('./gulp.config.js')();
var del = require('del');
var streamqueue = require('streamqueue');
var $ = require('gulp-load-plugins')({lazy: true});

// html
gulp.task('move-html-dev', move_html.bind(this, config.output_development));
gulp.task('move-html-prod', move_html.bind(this, config.output_production));

function move_html(destination)
{
    gulp.src(config.sourceHtml)
        .pipe(gulp.dest(destination));
}

// css
gulp.task('do-css-dev', do_css.bind(this, config.output_development));
gulp.task('do-css-prod', do_css.bind(this, config.output_production));

function do_css(destination)
{
    var stream = streamqueue({ objectMode: true });
    stream.queue(gulp.src(config.sourceStyleFiles)).pipe($.stylus());
    stream.queue(gulp.src(config.sourceCss));
    return stream.done()
            .pipe($.concat('styles.css'))
            .pipe(gulp.dest(destination));
}

// app.js
gulp.task('do-js-dev', do_js.bind(this, config.output_development));
gulp.task('do-js-prod', do_js.bind(this, config.output_production));

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

// lib.js
gulp.task('do-libjs-dev', do_libjs.bind(this, config.output_development));
gulp.task('do-libjs-prod', do_libjs.bind(this, config.output_production));

function do_libjs(destination)
{
    return gulp.src(config.sourceLibDependencies)
            .pipe($.concat('lib.js'))
            .pipe(gulp.dest(destination));
}

//clean
gulp.task('clean-dev', function () { clean(config.output_development); });

gulp.task('clean-prod', function () { clean(config.output_production); });

gulp.task('clean-all', ['clean-dev', 'clean-prod'])

function clean(destination)
{
    del(destination+'/**/*.*');
};
function clean_html(destination)
{
    del(destination + '/**/*.html');
};
function clean_css(destination)
{
    del(destination + '/**/*.css');
};
function clean_js(destination)
{
    del(destination + '/**/*.js');
};

//Code Quality Tasks
gulp.task('quality-control',
    function qualityControl()
    {
        return gulp.src(config.sourceJS)
                .pipe($.if(args.verbose, $.print()))
                .pipe($.jshint())
                .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
    })

//watches

gulp.task('watch', 
    function()
    { 
        //syntax checking
        gulp.watch(config.sourceReactComponents, ['quality-control']);
        gulp.watch(config.sourceJS, ['quality-control']);


        // dev moves
        gulp.watch(config.sourceJS, ['do-js-dev']);
        gulp.watch(config.sourceReactComponents, ['do-js-dev']);
        gulp.watch(config.sourceStyleFiles, ['do-css-dev']);
        gulp.watch(config.sourceHtml, ['move-html-dev']);
        gulp.watch(config.sourceLibDependencies, ['do-libjs-dev']);
    })
gulp.task('dev',['clean-dev','do-css-dev', 'do-js-dev', 'do-libjs-dev', 'move-html-dev']);
gulp.task('prod',['clean-prod','do-css-prod', 'do-js-prod', 'do-libjs-prod', 'move-html-prod']);

//gulp.task('default', ['dev', 'prod']);

