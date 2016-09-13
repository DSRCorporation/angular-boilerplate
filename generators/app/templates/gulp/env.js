'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  _ = require('lodash');

var gulpModes = {
  prod: 'production',
  dev: 'development',
  test: 'test'
};

exports.gulpModes = gulpModes;
exports.gulpCurrMode = function () {
  return gutil.env.GULP_MODE;
};
exports.gulpIgnoreModes = function () {
  var currMode = gutil.env.GULP_MODE || gulpModes.dev;
  return _.filter(gulpModes, function (mode) {
    return mode !== currMode;
  })
};

gulp.task('env:prod', function () {
  return gutil.env.GULP_MODE = gulpModes.prod;
});

gulp.task('env:dev', function () {
  return gutil.env.GULP_MODE = gulpModes.dev;
});

gulp.task('env:testing', function () {
  return gutil.env.GULP_MODE = gulpModes.test;
});
