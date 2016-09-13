(function () {
  'use strict';

  angular.module('webAppNameWebApp')
    .factory('securityHelpers', function ($log, appResources, localStorageService, localStorageKeys) {
      return {
        signIn: signIn,
        signOut: signOut,
        isSignedIn: isSignedIn
      };

      function signIn() {
        $log.debug('securityHelpers.signIn');
        // TODO: Implement me
      }

      function signOut() {
        $log.debug('securityHelpers.signOut');
        localStorageService.remove(localStorageKeys.authToken);
      }

      function isSignedIn() {
        return !!localStorageService.get(localStorageKeys.authToken);
      }

    });
})();
