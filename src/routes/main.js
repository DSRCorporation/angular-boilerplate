const global = {
  name: 'global',
  url: '/',
  component: 'global',
  abstract: true
}

const login = {
  name: 'global.login',
  url: 'login',
  component: 'login'
}

const main = {
  name: 'global.main',
  url: '',
  component: 'main',
  abstract: true
}

const cats = {
  name: 'global.main.cats',
  url: 'cats',
  component: 'cats',
  resolve: {
    /* @ngInject */
    cats: (appResources) => appResources.Cat.get().$promise
  }
}

const catCreation = {
  name: 'global.main.cat-create',
  url: 'cats/',
  component: 'catCreate'
}

const cat = {
  name: 'global.main.cat',
  url: 'cats/:id',
  component: 'cat',
  resolve: {
    /* @ngInject */
    catObj: (appResources, $stateParams) => appResources.Cat.get({id: $stateParams.id}).$promise
  }
}

const userInfo = {
  name: 'global.main.user-info',
  url: 'user-info',
  component: 'userInfo',
  resolve: {
    /* @ngInject */
    userInfoObj: (appResources) => appResources.User.get().$promise
  }
}

export default {global, login, main, cats, cat, catCreation, userInfo}
