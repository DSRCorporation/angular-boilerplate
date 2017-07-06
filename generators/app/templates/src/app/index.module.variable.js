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
    'ngMessages',
    <%_; if (jwt) { _%>
    'LocalStorageModule',
    <%_ } if (components) { _%>
    'angularRandomString',
    <%_ } if (responsive) { _%>
    'ngResponsiveBreakpoints',
    <%_ } _%>
  ]);
