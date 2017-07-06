angular
  .module('webAppNameWebApp')
  .config(config);

function config($logProvider, $locationProvider,
  <%_ if (jwt) { _%>
  localStorageServiceProvider, $httpProvider,
<%_ } _%>) {
  $logProvider.debugEnabled('webAppNameWebAppDebugEnabled');
  $locationProvider.html5Mode(true);
  <%_ if (jwt) { _%>
  localStorageServiceProvider.setPrefix('webAppName');
  $httpProvider.interceptors.push('securityInterceptor');
  <%_ } _%>
}
