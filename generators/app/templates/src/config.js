/* @ngInject */
function config ($logProvider, $locationProvider, localStorageServiceProvider, $httpProvider) {
  $logProvider.debugEnabled(window.APP_ENV !== 'production')
  $locationProvider.html5Mode(true)
  localStorageServiceProvider.setPrefix('webAppName')
  $httpProvider.interceptors.push('securityInterceptor')
}

export default config
