/* @ngInject */
function config ($logProvider, $locationProvider, localStorageServiceProvider, $httpProvider) {
  $logProvider.debugEnabled(process.env.NODE_ENV !== 'production')
  $locationProvider.html5Mode(true)
  localStorageServiceProvider.setPrefix('angularjs-sample-project-dsr')
  $httpProvider.interceptors.push('securityInterceptor')
}

export default config
