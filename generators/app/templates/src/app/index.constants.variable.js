angular
  .module('webAppNameWebApp')
  // Version: automatically pulled from package.json by gulp
  .constant('version', 'webAppNameWebAppVersion')
  // Dialog buttons
  .constant('dialogButtons', {
    CANCEL: 0,
    OK: 1,
    YES: 2,
    NO: 3,
  })
  // Backend error codes
  .constant('errorCodes', {
    // TODO: Add backend error codes
  })
  <%_; if (jwt) { _%>
  .constant('localStorageKeys', {
    authToken: 'authToken',
  })<%_} _%>;
