(function () {
	'use strict';

	var path = require('path'),
		fs = require('fs'),
		gulp = require('gulp'),
		conf = require('./conf'),
		env = require('./env'),
		replaceables = require('./replaceables'),
		browserSync = require('browser-sync'),
		$ = require('gulp-load-plugins')();

	gulp.task('annotate', function () {
		var ret = gulp.src(populateArrayWithIgnoreFiles([
				path.join(conf.paths.src, '/app/**/*.module.js'),
				path.join(conf.paths.src, '/app/**/*.js'),
				path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
				path.join('!' + conf.paths.src, '/app/**/*.mock.js')
			]))
			.pipe($.ngAnnotate({
				single_quotes: true // eslint-disable-line
			}));
		ret = populateReplaceables(ret);
		return ret.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
	});

	gulp.task('scripts', ['annotate'], function () {
		return gulp.src(populateArrayWithIgnoreFiles([path.join(conf.paths.src, '/app/**/*.js')]))
			.pipe($.eslint())
			.pipe($.eslint.format())
			.pipe($.eslint.format('checkstyle', fs.createWriteStream('checkstyle.xml')))
			.pipe(env.gulpCurrMode() === env.gulpModes.dev ? $.util.noop() : $.eslint.failAfterError())
			.pipe(browserSync.reload({stream: true}))
			.pipe($.size());
	});

	function populateArrayWithIgnoreFiles(arr) {
		(env.gulpIgnoreModes()).forEach(function (ignoreMode) {
			arr.push(path.join('!' + conf.paths.src, '/app/*.' + ignoreMode + '.js'));
		});
		return arr;
	}

	function populateReplaceables(pipeline) {
		replaceables.forEach(function(replaceable) {
			pipeline.pipe($.if(replaceable.constraint || true, $.replace(replaceable.target, replaceable.value())));
		});
		return pipeline;
	}
})();
