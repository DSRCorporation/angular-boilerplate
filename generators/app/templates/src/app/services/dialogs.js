(function () {
  'use strict';

  angular.module('webAppNameWebApp')
    .factory(
      'dialogs',
      function (ngDialog, dialogButtons) {
        return {
          backendError: backendError,
          message: message
        };

        function backendError(error) {
          return ngDialog.open({
            template: 'app/dialogs/backend-error/backend-error.html',
            data: {
              error: error,
              dialogButtons: dialogButtons
            }
          });
        }

        function message(msg) {
          return ngDialog.open({
            template: 'app/dialogs/message/message.html',
            data: {
              message: msg,
              dialogButtons: dialogButtons
            }
          });
        }
      });
})();
