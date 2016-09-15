(function () {
  'use strict';

  angular
    .module('webAppNameWebApp')
    .config(config);

  function config($logProvider, $locationProvider<% if (jwt) { %>, localStorageServiceProvider, $httpProvider<% } %>) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
    <% if (jwt) { %>
    localStorageServiceProvider.setPrefix('webAppName');
    $httpProvider.interceptors.push('securityInterceptor');
    <% } %>
  }

})();
