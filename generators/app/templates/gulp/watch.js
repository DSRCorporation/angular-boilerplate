'use strict';

const path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync');

const isOnlyChange = (event) => event.type === 'changed';

gulp.task('watch', (done) => runSequence('env:dev', 'watch:core', done));

gulp.task('watch:core', ['inject'], function () {
  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.less'),
  ],
  (event) => isOnlyChange(event) ? gulp.start('styles') : gulp.start('inject')
  );

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'),
    (event) => isOnlyChange(event) ? gulp.start('scripts') : gulp.start('inject')
  );

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), (event) => browserSync.reload(event.path));
});
