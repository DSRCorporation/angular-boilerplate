'use strict';

var path = require('path'),
  gulp = require('gulp'),
  conf = require('./conf'),
  postcss = require('gulp-postcss'),
  postcssFocus = require('postcss-focus'),
  postcssClearfix = require('postcss-clearfix'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync'),
  $ = require('gulp-load-plugins')(),
  wiredep = require('wiredep').stream;

gulp.task('styles', function () {
  var lessOptions = {
    options: [
      'bower_components',
      path.join(conf.paths.src, '/app')
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.less'),
    path.join('!' + conf.paths.src, '/app/index.less')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var processors = [
    postcssFocus,
    postcssClearfix,
    autoprefixer
  ];


  return gulp.src([
    path.join(conf.paths.src, '/app/index.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(postcss(processors))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});
