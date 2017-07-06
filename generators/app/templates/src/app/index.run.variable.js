angular
  .module('webAppNameWebApp')
  .run(runBlock);

function runBlock($log, errorHelpers, $rootScope, $state, version, $window,
  <%_ if (backBtn) { _%>
  $timeout, $location,
  <%_ } if (scrollToTop) { _%>
  $document,
  <%_ } if (responsive) { _%>
  responsiveBreakpoints,
  <%_ } _%>) {
  $log.debug('runBlock');

  $window.webAppVersion = version;
  <%_ if (backBtn) { _%>
  $rootScope.$on('$locationChangeSuccess', () => $rootScope.actualLocation = $location.path());

  $rootScope.$watch(
    () => $location.path(),
    (newLocation) => ($rootScope.actualLocation === newLocation) && ($rootScope.backButtonPressed = true),
  );
  <%_ } _%>

  <%_ if (backBtn || scrollToTop || detectScreenBottom) { _%>
  $rootScope.$on('$stateChangeSuccess', function () {
    <%_ if (backBtn) { _%>
    $timeout(function () {
      if ($rootScope.backButtonPressed) {
        $rootScope.backButtonPressed = false;
        // TODO: Add your custom browser back button click handler here
      }
    });
    <%_ } if (scrollToTop) { _%>
    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
    <%_ } _%>
  });

  <%_ } if (detectScreenBottom) { _%>
  angular.element($window).bind('scroll', function () {
    if (this.document.body.scrollTop + this.document.body.clientHeight >= this.document.body.scrollHeight) {
      $rootScope.$broadcast('ui.scrollbarIsOnBottom');
    }
  });
  <%_ } if (responsive) { _%>
  _.assign($rootScope, {
    screen: responsiveBreakpoints,
  });
  <%_ } _%>

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    $log.error('runBlock -> $stateChangeError', event, toState, toParams, error);
    if (error) {
      return errorHelpers.handleBackendError($rootScope, error);
    }
    $state.go('global');
  });
}
