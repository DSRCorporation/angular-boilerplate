import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$scope')
class ErrorController {
  $onInit () {
    this.$log.debug('ErrorController.$onInit')

    this.$scope.$on('customFieldError', function (event, field) {
      if (field.name === this.input) {
        let input = this.form[this.input]

        input.$setValidity('custom', false)
        input.customError = field.message

        this.$scope.$watch(
          () => input.$viewValue,
          (newValue, oldValue) => (newValue !== oldValue) && input.$setValidity('custom', true)
        )
      }
    })

    this.$log.debug('ErrorController.$onInit -> done')
  }
}

const error = {
  template: template,
  controller: ErrorController,
  require: {
    form: '^^'
  },
  bindings: {
    input: '@'
  }
}

export default error
