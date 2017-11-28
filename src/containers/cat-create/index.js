import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$state', 'appResources', 'errorHelpers', '$scope')
class CatCreationController {
  createCat = async () => {
    if (!this.catForm.$valid) {
      return
    }

    const cat = await this.appResources.Cat.save(null, this.cat).$promiseHandled(this.$scope)
    this.$state.go('global.main.cat', { id: cat.id })
  }

  updateCatData = (catData) => {
    this.$log.debug('CatController.updateCatData', catData)
    this.cat = catData
  }
}

const catCreation = {
  template: template,
  controller: CatCreationController,
  bindings: {
    cat: '<'
  }
}

export default catCreation
