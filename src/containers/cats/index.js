import template from './template.html'

// eslint-disable-next-line
@Inject('$log', '$state')
class CatsController {
  viewCat = (cat) => this.$state.go('global.main.cat', {id: cat.id})
}

const cats = {
  template: template,
  controller: CatsController,
  bindings: {
    cats: '<'
  }
}

export default cats
