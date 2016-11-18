(function () {
	'use strict';

	var fs = require('fs'),
		prefix = 'webAppNameWebApp',
		env = require('./env'),
		gulpCurrentMode = env.gulpCurrMode,
		gulpModes = env.gulpModes;

	var packageJson = JSON.parse(fs.readFileSync('./package.json'));

	module.exports = [
		{
			target: prefixTarget('Version'),
			value: version,
			constraint: /index.constants.js$/
		},
		{
			target: prefixTarget('DebugEnabled'),
			value: debugEnabled,
			constraint: /index.config.js$/
		}
	];

	function prefixTarget(target) {
		return quoteWrap(prefix + target);
	}

	function quoteWrap(val) {
		return '\'' + val + '\'';
	}

	function version() {
		return quoteWrap(packageJson.version);
	}

	function debugEnabled() {
		return gulpCurrentMode() !== gulpModes.prod;
	}
})();
