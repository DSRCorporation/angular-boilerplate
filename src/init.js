import {version} from 'app-constants'

/* @ngInject */
function runBlock ($log, errorHelpers, $rootScope, $state, $window, $timeout, $location, $document,
  responsiveBreakpoints, $transitions) {
  $log.debug('runBlock')

  $window.webAppVersion = version
  $rootScope.$on('$locationChangeSuccess', () => {
    $rootScope.actualLocation = $location.path()
    return $rootScope.actualLocation
  })

  $rootScope.$watch(
    () => $location.path(),
    (newLocation) => ($rootScope.actualLocation === newLocation) && ($rootScope.backButtonPressed = true)
  )

  $transitions.onSuccess({}, function (transition) {
    $log.debug('runBlock -> Transition success', transition)
    $timeout(function () {
      if ($rootScope.backButtonPressed) {
        $rootScope.backButtonPressed = false
        // TODO: Add your custom browser back button click handler here
      }
    })
    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0
  })

  $transitions.onError({}, function (transition) {
    $log.debug('runBlock -> Transition error', transition)
    let error = transition.error()
    error.data = error.detail.data

    if (error) {
      return errorHelpers.handleBackendError($rootScope, error)
    }
    $state.go('global')
  })

  angular.element($window).bind('scroll', function () {
    if (this.document.body.scrollTop + this.document.body.clientHeight >= this.document.body.scrollHeight) {
      $rootScope.$broadcast('ui.scrollbarIsOnBottom')
    }
  })

  Object.assign($rootScope, {
    screen: responsiveBreakpoints
  })
}

export default runBlock
