(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.component('checkbox', {
			templateUrl: 'app/components/checkbox/checkbox.html',
			controller: CheckboxController,
			require: {
				form: '^^'
			},
			bindings: {
				model: '=',
				required: '<',
				disabled: '<',
				name: '@',
				label: '@'
			}
		});

	function CheckboxController($log, $scope, randomString) {
		var ctrl = this;

		activate();

		function activate() {
			$log.debug('CheckboxController.activate');

			_.extend(ctrl, {
				formName: 'checkBoxForm' + randomString(32),
				$onInit: init
			});

			$log.debug('CheckboxController.activate -> done');
		}

		function init() {
			$log.debug('CheckboxController.init');

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

			$log.debug('CheckboxController.init -> done');
		}
	}
})();
