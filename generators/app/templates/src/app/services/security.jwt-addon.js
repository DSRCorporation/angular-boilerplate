angular.module('webAppNameWebApp')
  .factory('security', security);

function security($log, appResources, localStorageService, localStorageKeys) {
  const security = {
    signIn: signIn,
    signOut: signOut,
    isSignedIn: isSignedIn,
  };

  function signIn() {
    $log.debug('security.signIn');
    // TODO: Implement me
  }

  function signOut() {
    $log.debug('security.signOut');
    localStorageService.remove(localStorageKeys.authToken);
  }

  function isSignedIn() {
    return !!localStorageService.get(localStorageKeys.authToken);
  }

  return security;
}
