(function () {
  'use strict';

  angular
    .module('webAppNameWebApp')
    .run(runBlock);

  function runBlock($log) {
    $log.debug('runBlock');

  }

})();
