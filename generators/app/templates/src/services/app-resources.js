import constants from 'constants' //eslint-disable-line

// eslint-disable-next-line
@Inject('$resource')
class AppResources {
  // Example
  /* User = this.$resource(constants.apiSettings.apiRoot + '/user/:verb', null, {
    recoveryPassword: {
      method: 'POST',
      params: {verb: 'recovery_password'},
    },
    verifyEmail: {
      method: 'POST',
      params: {verb: 'verify_email'},
    },
    verifyResetPasswordCode: {
      method: 'POST',
      params: {verb: 'verify_reset_password_code'},
    },
    resetPassword: {
      method: 'POST',
      params: {verb: 'reset_password'},
    },
  }); */
}

export default AppResources
