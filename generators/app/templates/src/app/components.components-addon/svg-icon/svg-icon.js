(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.component('svgIcon', {
			templateUrl: 'app/components/svg-icon/svg-icon.html',
			bindings: {
				icon: '@'
			}
		});
})();
