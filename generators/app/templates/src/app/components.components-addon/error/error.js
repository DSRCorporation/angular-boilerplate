angular.module('webAppNameWebApp')
  .component('error', {
    templateUrl: 'app/components/error/error.html',
    controller: ErrorController,
    require: {
      form: '^^',
    },
    bindings: {
      input: '@',
    },
  });

function ErrorController($scope, $log) {
  const ctrl = this;

  activate();

  function activate() {
    $log.debug('ErrorController.activate');

    _.extend(ctrl, {
      $onInit: init,
    });

    $log.debug('ErrorController.activate -> done');
  }

  function init() {
    $log.debug('ErrorController.init');

    $scope.$on('customFieldError', function (event, field) {
      if (field.name === ctrl.input) {
        let input = ctrl.form[ctrl.input];

        input.$setValidity('custom', false);
        input.customError = field.message;

        $scope.$watch(
          () => input.$viewValue,
          (newValue, oldValue) => (newValue !== oldValue) && input.$setValidity('custom', true),
        );
      }
    });

    $log.debug('ErrorController.init -> done');
  }
}
