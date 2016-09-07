(function () {
  'use strict';

  angular
    .module('webAppNameWebApp')
    .config(config);

  function config($logProvider, $locationProvider, localStorageServiceProvider, $httpProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('webAppName');
    $httpProvider.interceptors.push('securityInterceptor');
  }

})();
