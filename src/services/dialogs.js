import constants from 'app-constants'
import backendErrorTemplate from 'dialogs/backend-error/template.html'
import messageTemplate from 'dialogs/message/template.html'

// eslint-disable-next-line
@Inject('ngDialog')
class Dialogs {
  backendError = (error) => this.ngDialog.open({ //eslint-disable-line
    template: backendErrorTemplate,
    plain: true,
    data: {
      error: error,
      dialogButtons: constants.dialogButtons
    }
  })

  message = (msg) => this.ngDialog.open({ //eslint-disable-line
    template: messageTemplate,
    plain: true,
    data: {
      message: msg,
      dialogButtons: constants.dialogButtons
    }
  })
}

export default Dialogs
