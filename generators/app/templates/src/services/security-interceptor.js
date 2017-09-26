import constants from 'constants'

// eslint-disable-next-line
@Inject('localStorageService')
class SecurityInterceptor {
  request (config) {
    let authToken = this.localStorageService.get(constants.localStorageKeys.authToken)

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  }

  response (response) {
    let authorizationHeader = response.headers('Authorization')

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      this.localStorageService.set(constants.localStorageKeys.authToken, authorizationHeader.replace('Bearer ', ''))
    }

    return response
  }
}

export default SecurityInterceptor
