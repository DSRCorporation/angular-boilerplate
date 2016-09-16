(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.component('radioButton', {
			templateUrl: 'app/components/radio-button/radio-button.html',
			controller: RadioButtonController,
			require: {
				form: '^^'
			},
			bindings: {
				model: '=',
				label: '@',
				value: '<',
				required: '<',
				disabled: '<',
				name: '@'
			}
		});

	function RadioButtonController($log, $scope, randomString) {
		var ctrl = this;

		activate();

		function activate() {
			$log.debug('RadioButtonController.activate');

			_.extend(ctrl, {
				formName: 'radioButtonForm' + randomString(32),
				$onInit: init
			});

			$log.debug('RadioButtonController.activate -> done');
		}

		function init() {
			$log.debug('RadioButtonController.init');

			$scope.$watch(
				function () {
					return ctrl.form.$submitted;
				},
				function (newValue) {
					if (newValue) {
						$scope[ctrl.formName].$setSubmitted();
					}
				}
			);

			$log.debug('RadioButtonController.init -> done');
		}
	}
})();
