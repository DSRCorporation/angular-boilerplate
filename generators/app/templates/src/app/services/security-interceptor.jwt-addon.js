(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.factory('securityInterceptor', function (localStorageService, localStorageKeys) {
			return {
				request: request,
				response: response
			};

			function request(config) {
				var authToken = localStorageService.get(localStorageKeys.authToken);

				if (authToken) {
					config.headers.Authorization = 'Bearer ' + authToken;
				}

				return config;
			}

			function response(response) {
				var authorizationHeader = response.headers('Authorization');

				if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
					localStorageService.set(localStorageKeys.authToken, authorizationHeader.replace('Bearer ', ''));
				}

				return response;
			}
		});
})();
