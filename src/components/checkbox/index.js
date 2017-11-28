import { generate as randStr } from 'randomstring'
import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$scope')
class CheckboxController {
  $onInit () {
    this.$log.debug('CheckboxController.$onInit')

    Object.assign(this, {
      formName: `checkBoxForm${randStr(32)}`
    })

    this.$scope.$watch(
      () => this.form.$submitted,
      (newValue) => newValue && this.$scope[this.formName].$setSubmitted()
    )

    this.$log.debug('CheckboxController.$onInit -> done')
  }
}

const checkbox = {
  template: template,
  controller: CheckboxController,
  require: {
    form: '^^'
  },
  bindings: {
    model: '=',
    required: '<',
    disabled: '<',
    name: '@',
    label: '@'
  }
}

export default checkbox
