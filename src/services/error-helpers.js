import constants from 'app-constants' //eslint-disable-line
import { forEach } from 'lodash'

// eslint-disable-next-line
@Inject('$state', '$log', 'dialogs')
class ErrorHelpers {
  showCustomFieldError = (scope, fieldError) => scope.$broadcast('customFieldError', fieldError)

  handleBackendError = (scope, error, customHandler) => {
    this.$log.error('handleBackendError -> ', error)

    if (error.data && error.data.code && customHandler && customHandler(scope, error)) {
      this.$log.debug('handleBackendError -> error handled by custom handler')
      return
    }

    if (error.data && error.data.code === constants.errorCodes.UNAUTHORIZED_ERROR) {
      this.$log.debug('handleBackendError -> authorization error')
      this.showError(error.data.message)
      return this.$state.go('global.login')
    }

    if (error.data && error.data.code === constants.errorCodes.VALIDATION_ERROR) {
      this.$log.debug('handleBackendError -> validation error')

      if (scope && error.data.fields && error.data.fields.length) {
        return forEach(error.data.fields, (fieldError) => this.showCustomFieldError(scope, fieldError))
      }

      this.showError(error.data.message)
      return
    }

    if (error.status && error.status <= 0) {
      this.$log.debug('handleBackendError -> connection error')
      this.showError('Connection error. Please try again.')
      return
    }

    this.$log.debug('handleBackendError -> unexpected error')

    if (error.data && error.data.message) {
      this.showError(error.data.message)
      return
    }

    this.showError(error)
  }

  throwError = (code, message, redirect) => {
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

  mapBackendValidationError = (error, scope, fieldMap) => {
    this.$log.error('mapBackendValidationError -> ', error)

    if (error.data && error.data.fields) {
      error.data.fields = _.map(error.data.fields, (value) => ({...value, name: fieldMap[value.name] || value.name}))
    }

    this.handleBackendError(error, scope)
  }

  showError = this.dialogs.message
}

export default ErrorHelpers
