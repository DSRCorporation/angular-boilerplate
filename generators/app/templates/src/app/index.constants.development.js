(function () {
	'use strict';

	angular
		.module('webAppNameWebApp')
		// Site settings
		.constant('apiSettings', {
			apiRoot: 'http://backend:3000/api/v1'
		});
})();
