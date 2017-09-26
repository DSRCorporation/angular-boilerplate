import constants from 'constants'

// eslint-disable-next-line
@Inject('$log', 'appResources', 'localStorageService')
class Security {
  signIn () {
    this.$log.debug('signIn')
    // TODO: Implement me
  }

  signOut () {
    this.$log.debug('security.signOut')
    this.localStorageService.remove(constants.localStorageKeys.authToken)
  }

  isSignedIn () {
    return !!this.localStorageService.get(constants.localStorageKeys.authToken)
  }
}

export default Security
