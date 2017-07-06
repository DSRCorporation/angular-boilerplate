angular.module('webAppNameWebApp')
  .component('checkbox', {
    templateUrl: 'app/components/checkbox/checkbox.html',
    controller: CheckboxController,
    require: {
      form: '^^',
    },
    bindings: {
      model: '=',
      required: '<',
      disabled: '<',
      name: '@',
      label: '@',
    },
  });

function CheckboxController($log, $scope, randomString) {
  const ctrl = this;

  activate();

  function activate() {
    $log.debug('CheckboxController.activate');

    _.extend(ctrl, {
      formName: 'checkBoxForm' + randomString(32),
      $onInit: init,
    });

    $log.debug('CheckboxController.activate -> done');
  }

  function init() {
    $log.debug('CheckboxController.init');

    $scope.$watch(
      () => ctrl.form.$submitted,
      (newValue) => newValue && $scope[ctrl.formName].$setSubmitted(),
    );

    $log.debug('CheckboxController.init -> done');
  }
}
