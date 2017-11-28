import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$scope', '$window')
class CatDisplayController {
  $onInit () {
    this.$log.debug('CatDisplayController.$onInit')

    Object.assign(this, {
      cat: this.$window.angular.copy(this.catOriginal)
    })

    if (this.updateCat) {
      this.$scope.$watch(
        () => this.cat,
        (newCatData) => this.updateCat({ catData: newCatData }),
        true
      )
    }

    this.$log.debug('CatDisplayController.$onInit -> done')
  }
}

const catDisplay = {
  template: template,
  controller: CatDisplayController,
  bindings: {
    catOriginal: '<cat',
    isEditing: '<',
    updateCat: '&'
  }
}

export default catDisplay
