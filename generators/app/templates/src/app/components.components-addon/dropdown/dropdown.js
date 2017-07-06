angular.module('webAppNameWebApp')
  .component('dropdown', {
    templateUrl: 'app/components/dropdown/dropdown.html',
    controller: DropdownController,
    require: {
      form: '^^',
    },
    bindings: {
      model: '=',
      required: '<',
      options: '<',
      name: '@',
      label: '@',
    },
  });

function DropdownController($log, $scope, randomString) {
  const ctrl = this;

  activate();

  function activate() {
    $log.debug('DropdownController.activate');

    _.extend(ctrl, {
      formName: `dropdownForm${randomString(32)}`,
      $onInit: init,
    });

    $log.debug('DropdownController.activate -> done');
  }

  function init() {
    $log.debug('DropdownController.init');

    $scope.$watch(
      () => ctrl.form.$submitted,
      (newValue) => newValue && $scope[ctrl.formName].$setSubmitted(),
    );

    $log.debug('DropdownController.init -> done');
  }
}
