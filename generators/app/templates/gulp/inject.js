(function () {
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		conf = require('./conf'),
		$ = require('gulp-load-plugins')(),
		wiredep = require('wiredep').stream;

	gulp.task('inject', ['scripts', 'styles'], function () {
		var injectStyles = gulp.src([
			path.join(conf.paths.tmp, '/serve/app/**/*.css'),
			path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
		], {read: false});

		var injectScripts = gulp.src(path.join(conf.paths.tmp, '/serve/app/**/*.js'))
			.pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

		var injectOptions = {
			ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
			addRootSlash: false
		};

		return gulp.src(path.join(conf.paths.src, '/*.html'))
			.pipe($.inject(injectStyles, injectOptions))
			.pipe($.inject(injectScripts, injectOptions))
			.pipe(wiredep(Object.assign({}, conf.wiredep)))
			.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
	});

})();
