'use strict';

const gulp = require('gulp'),
  gutil = require('gulp-util'),
  _ = require('lodash');

const gulpModes = {
  prod: 'production',
  dev: 'development',
  test: 'test',
};

module.exports.gulpModes = gulpModes;
module.exports.gulpCurrMode = () => gutil.env.GULP_MODE;
module.exports.gulpIgnoreModes = function () {
  let currMode = gutil.env.GULP_MODE || gulpModes.dev;

  return _.filter(gulpModes, function (mode) {
    return mode !== currMode;
  });
};

gulp.task('env:prod', () => gutil.env.GULP_MODE = gulpModes.prod);

gulp.task('env:dev', () => gutil.env.GULP_MODE = gulpModes.dev);

gulp.task('env:testing', () => gutil.env.GULP_MODE = gulpModes.test);
