(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.factory('security', function ($log, appResources, localStorageService, localStorageKeys) {
			return {
				signIn: signIn,
				signOut: signOut,
				isSignedIn: isSignedIn
			};

			function signIn() {
				$log.debug('security.signIn');
				// TODO: Implement me
			}

			function signOut() {
				$log.debug('security.signOut');
				localStorageService.remove(localStorageKeys.authToken);
			}

			function isSignedIn() {
				return !!localStorageService.get(localStorageKeys.authToken);
			}

		});
})();
