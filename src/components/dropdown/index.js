import { generate as randStr } from 'randomstring'
import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$scope')
class DropdownController {
  $onInit () {
    this.$log.debug('DropdownController.$onInit')

    Object.assign(this, {
      formName: `dropdownForm${randStr(32)}`
    })

    this.$scope.$watch(
      () => this.form.$submitted,
      (newValue) => newValue && this.$scope[this.formName].$setSubmitted()
    )

    this.$log.debug('DropdownController.$onInit -> done')
  }
}

const dropdown = {
  template: template,
  controller: DropdownController,
  require: {
    form: '^^'
  },
  bindings: {
    model: '=',
    required: '<',
    options: '<',
    name: '@',
    label: '@'
  }
}

export default dropdown
