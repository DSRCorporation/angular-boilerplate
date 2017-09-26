import { forEach } from 'lodash'
import states from 'routes/main'

/* @ngInject */
function configureRouting ($urlRouterProvider, $stateProvider) {
  forEach(states, (state) => $stateProvider.state(state))
  $urlRouterProvider.otherwise('/')
}

export default configureRouting
