'use strict';

const path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  $ = require('gulp-load-plugins')(),
  wiredep = require('wiredep').stream;

gulp.task('inject', ['scripts', 'styles'], function () {
  let injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'),
  ], {read: false});

  let injectScripts = gulp.src(path.join(conf.paths.tmp, '/serve/app/**/*.js'))
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  let injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false,
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
