(function () {
  'use strict';

  angular
    .module('webAppNameWebApp')
    // Site settings
    .constant('apiSettings', {
      apiRoot: 'https://backend/api/v1'
    });
})();
