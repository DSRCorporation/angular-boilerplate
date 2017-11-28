import constants from 'app-constants'

/* @ngInject */
function decorator ($delegate, errorHelpers) {
  return function () {
    const args = [...arguments]
    args[0] = `${constants.apiSettings.apiRoot}${args[0]}`

    if (args.length === 1) {
      args[1] = null
    }
    const actions = args[2] || {}
    const defaultActions = { update: { method: 'PUT' } }
    args[2] = { ...defaultActions, ...actions }

    const resource = $delegate(...args)
    resource.prototype.$promiseHandled = function (scope) {
      return this.$promise.catch((e) => {
        errorHelpers.handleBackendError(scope, e)
        throw e
      })
    }
    return resource
  }
}

export default decorator
