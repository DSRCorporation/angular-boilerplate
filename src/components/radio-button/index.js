import { generate as randStr } from 'randomstring'
import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$scope')
class RadioButtonController {
  $onInit () {
    this.$log.debug('RadioButtonController.$onInit')

    Object.assign(this, {
      formName: `radioButtonForm${randStr(32)}`
    })

    this.$scope.$watch(
      () => this.form.$submitted,
      (newValue) => newValue && this.$scope[this.formName].$setSubmitted()
    )

    this.$log.debug('RadioButtonController.$onInit -> done')
  }
}

const radioButton = {
  template: template,
  controller: RadioButtonController,
  require: {
    form: '^^'
  },
  bindings: {
    model: '=',
    label: '@',
    value: '<',
    required: '<',
    disabled: '<',
    name: '@'
  }
}

export default radioButton
