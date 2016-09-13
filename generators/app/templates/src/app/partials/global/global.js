(function () {
  'use strict';

  angular.module('webAppNameWebApp')
    .controller('GlobalController',
      function ($scope, $log) {
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
    );

})();
