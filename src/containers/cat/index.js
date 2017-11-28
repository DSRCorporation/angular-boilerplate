import template from './template.html'
import { pick } from 'lodash'

// eslint-disable-next-line
@Inject('$log', '$state', 'appResources', 'errorHelpers', '$scope')
class CatController {
  $onInit = () => {
    this.cat = this.catObj.cat
  }

  saveCat = async () => {
    if (!this.catForm.$valid) {
      return
    }

    try {
      await this.appResources.Cat.update({id: this.cat.id}, pick(this.cat, 'name', 'bossName', 'birthDate')).$promise
      this.isEditing = false
    } catch (e) {
      this.errorHelpers.handleBackendError(this.$scope, e)
    }
  }

  deleteCat = async () => {
    try {
      await this.appResources.Cat.delete({id: this.cat.id}).$promise
      this.$state.go('global.main.cats')
    } catch (e) {
      this.errorHelpers.handleBackendError(this.$scope, e)
    }
  }
}

const cat = {
  template: template,
  controller: CatController,
  controllerAs: 'catCtrl',
  bindings: {
    catObj: '<'
  }
}

export default cat
