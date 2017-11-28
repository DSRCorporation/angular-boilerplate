import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$state', 'appResources', 'errorHelpers', '$scope')
class CatCreationController {
  createCat = async () => {
    if (!this.catForm.$valid) {
      return
    }

    try {
      let cat = await this.appResources.Cat.save(this.cat).$promise

      this.$state.go('global.main.cat', {id: cat.id})
    } catch (e) {
      this.errorHelpers.handleBackendError(this.$scope, e)
    }
  }
}

const catCreation = {
  template: template,
  controller: CatCreationController,
  controllerAs: 'catCreationCtrl',
  bindings: {
    cat: '<'
  }
}

export default catCreation
