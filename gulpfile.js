'use strict';

var gulp = require('gulp');
var traceur = require('gulp-traceur');

gulp.task('default', function () {
  return gulp.src('./lib/rxc.es6.js')
    .pipe(traceur({ sourceMap: true }))
    .pipe(gulp.dest('dist'));
});