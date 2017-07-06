angular.module('webAppNameWebApp')
  .controller('GlobalController', GlobalController);

function GlobalController($scope, $log) {
  activate();

  function activate() {
    $log.debug('GlobalController.activate');

    /* Example
     _.assign($scope, {
     param: paramValue
     });*/

    $log.debug('GlobalController.activate -> done');
  }
}
