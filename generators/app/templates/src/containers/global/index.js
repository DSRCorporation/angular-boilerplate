import template from './template.html'
import cat from 'assets/cat.jpg'

// eslint-disable-next-line
@Inject('$log')
class GlobalController {
  $onInit () {
    this.$log.debug('GlobalController.$onInit')

    Object.assign(this, {
      cat: cat
    })

    this.$log.debug('GlobalController.$onInit -> done')
  }
}

const global = {
  template: template,
  controller: GlobalController,
  controllerAs: 'globalCtrl'
}

export default global
