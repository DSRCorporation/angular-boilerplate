// eslint-disable-next-line
@Inject('$resource', '$log')
class AppResources {
  Security = this.$resource('/security/:verb', null, {
    login: {
      method: 'POST',
      params: {verb: 'login'}
    }
  })

  User = this.$resource('/user/:verb')

  Cat = this.$resource('/cats/:id/:verb')
}

export default AppResources
