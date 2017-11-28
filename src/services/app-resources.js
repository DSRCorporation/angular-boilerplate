import constants from 'app-constants'

// eslint-disable-next-line
@Inject('$resource', '$log')
class AppResources {
  Security = this.$resource(`${constants.apiSettings.apiRoot}/security/:verb`, null, {
    login: {
      method: 'POST',
      params: {verb: 'login'}
    }
  })

  User = this.$resource(`${constants.apiSettings.apiRoot}/user/:verb`, null, {})

  Cat = this.$resource(`${constants.apiSettings.apiRoot}/cats/:id/:verb`, null, {
    update: {
      method: 'PUT'
    }
  })
}

export default AppResources
