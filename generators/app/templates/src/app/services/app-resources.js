(function () {
  'use strict';

  angular.module('webAppNameWebApp')
    .factory('appResources', function ($resource, apiSettings) {
      return {
        /* Example
        User: $resource(apiSettings.apiRoot + '/user/:verb', null, {
          recoveryPassword: {
            method: 'POST',
            params: {verb: 'recovery_password'}
          },
          verifyEmail: {
            method: 'POST',
            params: {verb: 'verify_email'}
          },
          verifyResetPasswordCode: {
            method: 'POST',
            params: {verb: 'verify_reset_password_code'}
          },
          resetPassword: {
            method: 'POST',
            params: {verb: 'reset_password'}
          }
        })*/
      };
    });
})();
