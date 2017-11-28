import template from './template.html'
import cat from 'assets/cat.jpg'

// eslint-disable-next-line
@Inject('$log', 'appResources', '$state', 'errorHelpers', '$scope', 'security')
class LoginController {
  $onInit = () => {
    this.cat = cat
  }

  signIn = async () => {
    if (!this.loginForm.$valid) {
      return
    }

    await this.security.signIn(this.credentials)
    this.$log.debug('signIn -> success')
    this.$state.go('global.main.cats')
  }
}

const login = {
  template: template,
  controller: LoginController,
  controllerAs: 'loginCtrl'
}

export default login
