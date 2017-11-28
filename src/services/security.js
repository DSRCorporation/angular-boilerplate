import constants from 'app-constants'

// eslint-disable-next-line
@Inject('$log', 'appResources', 'localStorageService')
class Security {
  signIn = (credentials) => this.appResources.Security.login(credentials).$promiseHandled()

  signOut = () => {
    this.$log.debug('security.signOut')
    this.localStorageService.remove(constants.localStorageKeys.authToken)
  }

  isSignedIn = () => !!this.localStorageService.get(constants.localStorageKeys.authToken)
}

export default Security
