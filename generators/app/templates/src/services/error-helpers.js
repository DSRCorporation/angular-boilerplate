import constants from 'constants' //eslint-disable-line
import { map } from 'lodash'

// eslint-disable-next-line
@Inject('$state', '$log', 'dialogs')
class ErrorHelpers {
  showCustomFieldError (scope, fieldError) {
    scope.$broadcast('customFieldError', fieldError)
  }

  handleBackendError (scope, error, customHandler) {
    this.$log.error('handleBackendError -> ', error)

    if (error.data && error.data.code && customHandler && customHandler(scope, error)) {
      this.$log.debug('handleBackendError -> error handled by custom handler')
    }

    // TODO: Validate error and act accordingly its content

    // Example
    /* if (error && error.data && error.data.redirectData && error.data.redirectData.destination) {
     this.$log.debug('handleBackendError -> redirect');
      return this.$state.go(error.data.redirectData.destination, error.data.redirectData.params, {
        location: 'replace'
      });
     }

     if (error.data && error.data.code === constants.errorCodes.VALIDATION_ERROR) {
      this.$log.debug('handleBackendError -> validation error');

       if (scope && error.data.fields && error.data.fields.length) {
        return _.forEach(error.data.fields, (fieldError) => this.showCustomFieldError(scope, fieldError));
       }

       return this.dialogs.message(error.data.message);
     }

     if (error.status && error.status <= 0) {
      this.$log.debug('handleBackendError -> connection error');
      return this.dialogs.message('Connection error. Please try again.');
     }

     $log.debug('handleBackendError -> unexpected error');
     this.dialogs.backendError(error); */
  }

  throwError (code, message, redirect) {
    let err = {
      data: {
        code: code,
        message: message
      }
    }

    if (redirect) {
      err.data.redirect = redirect
    }

    throw Object.assign(new Error(), err)
  }

  mapBackendValidationError (error, scope, fieldMap) {
    this.$log.error('mapBackendValidationError -> ', error)

    if (error.data && error.data.fields) {
      error.data.fields = map(error.data.fields, (value) => ({...value, name: fieldMap[value.name] || value.name}))
    }

    this.handleBackendError(error, scope)
  }
}

export default ErrorHelpers
