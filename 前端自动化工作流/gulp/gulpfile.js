/* jshint node:true */
'use strict';
// generated on 2015-02-10 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      compass: true
    }))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src(['app/*.html'])
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    //.pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('jade', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src(['app/jade/*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(assets)
    //.pipe($.if('*.js', $.uglify()))
    //.pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('resource', function () {
  return gulp.src('bower_components/jquery-ui-1.11.4.custom/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/styles/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/compass-spirit/',
    '!app/psd/',
    '!app/jade/',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('others', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.map'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/scripts'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

// clear cache
gulp.task('clear', function (done) {
  return $.cache.clearAll(done);
});

gulp.task('cssmin', function () {
  gulp.src('bower_components/bootstrap/*.css')
    .pipe($.csso())
    .pipe(gulp.dest('bower_components/bootstrap/min'));
});

gulp.task('jsmin', function () {
  gulp.src('bower_components/bootstrap/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('bower_components/bootstrap/min'));
});

gulp.task('connect', ['styles'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('dist'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('dist'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/jade/**/*.jade')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'dist/*.html',
    '.tmp/styles/**/*.css',
    'dist/scripts/**/*.js',
    'dist/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch([
    'app/jade/**/*.jade',
    'app/scripts/**/*.js',
  ], ['jade']);
  gulp.watch('bower_components/**/*', ['jade']);
  gulp.watch('app/styles/**/*.scss', ['styles', 'jade']);
  gulp.watch('app/images/**/*', ['clear', 'images']);
  // gulp.watch('bower_components/jquery-ui-1.11.4.custom/images/**/*', ['resource']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['cssmin', 'jsmin', 'jade', 'images', 'extras', 'others'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
