'use strict';

var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  env = require('./env'),
  browserSync = require('browser-sync'),
  gutil = require('gulp-util'),
  $ = require('gulp-load-plugins')();

gulp.task('annotate', function () {
  return gulp.src(populateArrayWithIgnoreFiles([
      path.join(conf.paths.src, '/app/**/*.module.js'),
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
      path.join('!' + conf.paths.src, '/app/**/*.mock.js')
    ]))
    .pipe($.ngAnnotate({
      single_quotes: true
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
});

gulp.task('scripts', ['annotate'], function () {
  return gulp.src(populateArrayWithIgnoreFiles([path.join(conf.paths.src, '/app/**/*.js')]))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('gulp-jshint-jenkins-reporter'))
    .pipe(evn.gulpCurrMode() === env.gulpModes.dev ? gutil.noop() : $.jshint.reporter('fail'))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size());
});

function populateArrayWithIgnoreFiles(arr) {
  (env.gulpIgnoreModes()).forEach(function (ignoreMode) {
    arr.push(path.join('!' + conf.paths.src, '/app/*.' + ignoreMode + '.js'));
  });
  return arr;
}
