import { version } from 'app-constants'
import { RejectType } from '@uirouter/core'

/* @ngInject */
function runBlock ($log, errorHelpers, $rootScope, $window, $timeout, $location, $document,
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

  $transitions.onSuccess({}, (transition) => {
    $log.debug('runBlock -> Transition success', transition)
    $timeout(function () {
      if ($rootScope.backButtonPressed) {
        $rootScope.backButtonPressed = false
        // TODO: Add your custom browser back button click handler here
      }
    })
    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0
  })

  const handleErrorTypes = [ RejectType.ERROR, RejectType.INVALID ]
  $transitions.onError({}, (transition) => {
    $log.debug('runBlock -> Transition error', transition)
    const error = transition.error()

    if (!handleErrorTypes.includes(error.type)) {
      $log.debug('runBlock -> Transition error is not of required type', error.type)
      return
    }

    return errorHelpers.handleBackendError($rootScope, error.detail)
  })

  angular.element($window).bind('scroll', () => {
    if (this.document.body.scrollTop + this.document.body.clientHeight >= this.document.body.scrollHeight) {
      $rootScope.$broadcast('ui.scrollbarIsOnBottom')
    }
  })

  Object.assign($rootScope, {
    screen: responsiveBreakpoints
  })
}

export default runBlock
