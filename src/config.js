/* @ngInject */
function config ($logProvider, $locationProvider, localStorageServiceProvider, $httpProvider) {
  $logProvider.debugEnabled('12WebAppDebugEnabled')
  $locationProvider.html5Mode(true)
  localStorageServiceProvider.setPrefix('12')
  $httpProvider.interceptors.push('securityInterceptor')
}

export default config
