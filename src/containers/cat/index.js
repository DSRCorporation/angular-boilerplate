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

    await this.appResources.Cat.update({id: this.cat.id}, pick(this.cat, 'name', 'bossName', 'birthDate')).$promiseHandled(this.$scope)
    this.isEditing = false
  }

  deleteCat = async () => {
    await this.appResources.Cat.delete({id: this.cat.id}).$promiseHandled(this.$scope)
    this.$state.go('global.main.cats')
  }

  updateCatData = (catData) => {
    this.$log.debug('CatController.updateCatData', catData)
    Object.assign(this.cat, catData)
  }
}

const cat = {
  template: template,
  controller: CatController,
  bindings: {
    catObj: '<'
  }
}

export default cat
