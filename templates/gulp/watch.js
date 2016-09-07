'use strict';

var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', function(done) {
  runSequence('env:dev', 'watch:core', done);
});

gulp.task('watch:core', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.less')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
