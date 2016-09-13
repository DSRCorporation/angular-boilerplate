(function () {
  'use strict';

  angular
    .module('webAppNameWebApp', [
      'ngSanitize',
      'ngAnimate',
      'ngResource',
      'ngDialog',
      'angular-loading-bar',
      'ui.router',
      'ui.router.stateHelper',
      'angular-click-outside',
      'ngMessages'<% if (jwt) { %>,
      'LocalStorageModule'<% } if (components) { %>,
      'angularRandomString'<% } if (responsive) { %>,
      'ngResponsiveBreakpoints'<% } %>
      ]
    );

})();
