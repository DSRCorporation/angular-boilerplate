import template from './template.html'

// eslint-disable-next-line
@Inject('$state', 'security')
class MainController {
  signOut = () => {
    this.security.signOut()
    this.$state.go('global.login')
  }
}

const main = {
  template: template,
  controller: MainController,
  controllerAs: 'mainCtrl'
}

export default main
