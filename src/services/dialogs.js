import constants from 'app-constants'
import messageTemplate from 'dialogs/message/template.html'

// eslint-disable-next-line
@Inject('ngDialog')
class Dialogs {
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
