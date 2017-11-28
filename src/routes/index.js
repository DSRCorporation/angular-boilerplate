import { forEach } from 'lodash'
import states from 'routes/main'

/* @ngInject */
function configureRouting ($urlRouterProvider, $stateProvider) {
  forEach(states, (state) => $stateProvider.state(state))
  $urlRouterProvider.otherwise('/user-info')
}

export default configureRouting
