(function () {
	'use strict';

	angular
		.module('webAppNameWebApp')
		// Version
		.constant('version', '0.0.1')
		// Dialog buttons
		.constant('dialogButtons', {
			CANCEL: 0,
			OK: 1,
			YES: 2,
			NO: 3
		})
		// Backend error codes
		.constant('errorCodes', {
			// TODO: Add backend error codes
		})<%if (jwt) {%>
		.constant('localStorageKeys', {
			authToken: 'authToken'
		})<%}%>;
})();
