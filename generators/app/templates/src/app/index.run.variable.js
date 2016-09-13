(function () {
  'use strict';

  angular
    .module('webAppNameWebApp')
    .run(runBlock);

  function runBlock($log, errorHelpers<% if (backBtn) { %>, $rootScope<% } if (scrollToTop) { %>, $document <% } if (detectScreenBottom) { %>, $window <% } %>) {
    $log.debug('runBlock');
    <% if (backBtn) { %>
    $rootScope.$on('$locationChangeSuccess', function () {
      $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () {
      return $location.path();
    }, function (newLocation) {
      if ($rootScope.actualLocation === newLocation) {
        $rootScope.backButtonPressed = true;
      }
    });
    <% } %>

    <% if (backBtn || scrollToTop || detectScreenBottom) { %>
    $rootScope.$on('$stateChangeSuccess', function () {
    <% if (backBtn) { %>
      $timeout(function () {
        if ($rootScope.backButtonPressed) {
          $rootScope.backButtonPressed = false;
          // TODO: Add your custom browser back button click handler here 
        }
      });
  		<% } if (scrollToTop) { %>
  		$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
  		<% } %>
    });
    
    <% } if (detectScreenBottom) { %>
    angular.element($window).bind('scroll', function () {
      if (this.document.body.scrollTop + this.document.body.clientHeight >= this.document.body.scrollHeight) {
        $rootScope.$broadcast('ui.scrollbarIsOnBottom');
      }
    });
    <% } %>

		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			$log.error('runBlock -> $stateChangeError', event, toState, toParams, error);
      if (error) {
        return errorHelpers.handleBackendError(error);
      }
      $state.go('global');
    });
  }

})();
