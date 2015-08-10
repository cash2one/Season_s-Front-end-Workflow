'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('name',['tasks'], function() {
  // content
  return gulp.src('files')
    .pipe(name(''))
    .pipe(gulp.dest('folder'));
});

