(function () {
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		conf = require('./conf'),
		browserSync = require('browser-sync'),
		util = require('util'),
	//proxyMiddleware = require('http-proxy-middleware'),
		history = require('connect-history-api-fallback');

	function browserSyncInit(baseDir, browser) {
		browser = browser === undefined ? 'default' : browser;

		var routes = null;

		if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
			routes = {
				'/bower_components': 'bower_components'
			};
		}

		var server = {
			baseDir: baseDir,
			routes: routes,
			middleware: [history()]
		};

		/*
		 * You can add a proxy to your backend by uncommenting the line bellow.
		 * You just have to configure a context which will we redirected and the target url.
		 * Example: $http.get('/users') requests will be automatically proxified.
		 *
		 * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
		 */
		// server.middleware = proxyMiddleware('/users',
		// {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

		browserSync.instance = browserSync.init({
			startPath: '/',
			server: server,
			browser: browser,
			ghostMode: false, // disable sync between all devices!!!
			port: 3002, // static port
			ui: false // don't run ui
		});
	}

	gulp.task('serve', ['watch'], function () {
		browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
	});

	gulp.task('serve:dist', ['build'], function () {
		browserSyncInit(conf.paths.dist);
	});

})();
