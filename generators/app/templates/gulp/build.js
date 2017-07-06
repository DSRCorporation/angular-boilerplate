'use strict';

const path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  runSequence = require('run-sequence'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'guest-layout-example-bower-files', 'uglify-save-license', 'del', 'main-bower-files'],
  });

gulp.task('partials', () => gulp.src(path.join(conf.paths.src, '/app/**/*.html'))
  .pipe($.minifyHtml({
    empty: true,
    spare: true,
    quotes: true,
  }))
  .pipe($.angularTemplatecache('templateCacheHtml.js', {
    module: '12WebApp',
    root: 'app',
  }))
  .pipe(gulp.dest(conf.paths.tmp + '/partials/')));

gulp.task('html', ['inject', 'partials'], function () {
  let partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
  let partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false,
  };

  let htmlFilter = $.filter('*.html');
  let jsFilter = $.filter('**/*.js');
  let cssFilter = $.filter('**/*.css');
  let assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate({
      single_quotes: true, // eslint-disable-line
    }))
    .pipe($.uglify({
      preserveComments: $.uglifySaveLicense,
      mangle: false,
    })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true,
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', () => gulp.src($.mainBowerFiles())
  .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
  .pipe($.flatten())
  .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/'))));

gulp.task('other', function () {
  let fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/index.html'),
    path.join('!' + conf.paths.src, '/app/**/*'),
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', (done) => $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done));

gulp.task('build', (done) => runSequence('clean', 'env:prod', ['html', 'fonts', 'other'], done));
