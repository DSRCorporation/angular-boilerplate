(function () {
	'use strict';

	angular
		.module('webAppNameWebApp')
		.config(configureRouting);

	function configureRouting($urlRouterProvider, stateHelperProvider) {
		stateHelperProvider
			.state({
				name: 'global',
				url: '/',
				templateUrl: 'app/partials/global/global.html',
				controller: 'GlobalController'
			});

		$urlRouterProvider.otherwise(function ($injector) {
			$injector.get('$state').go('global');
		});
	}

})();
