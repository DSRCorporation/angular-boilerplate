import angular from 'angular'
import { forEach } from 'lodash'

import ngSanitize from 'angular-sanitize'
import ngAnimate from 'angular-animate'
import ngResource from 'angular-resource'
import ngDialog from 'ng-dialog'
import loadingBar from 'angular-loading-bar'
import uiRouter from '@uirouter/angularjs'
import localStorage from 'angular-local-storage'
import responsiveBreakpoints from 'angular-responsive-breakpoints'
import angularjsToaster from 'angularjs-toaster' //eslint-disable-line

import init from 'init'
import routes from 'routes'
import config from 'config'
import services from 'services'
import components from 'components'
import containers from 'containers'

import styles from 'index.less' // eslint-disable-line
import toasterStyles from 'angularjs-toaster/toaster.min.css' // eslint-disable-line

// This module does not support ES6 imports
require('@iamadamjowett/angular-click-outside')
const clickOutside = 'angular-click-outside'

// angularjsToaster doesn't consist this
const toaster = 'toaster'

const app = angular
  .module('12WebApp', [
    ngSanitize,
    ngAnimate,
    ngResource,
    ngDialog,
    loadingBar,
    uiRouter,
    localStorage,
    responsiveBreakpoints,
    clickOutside,
    toaster
  ])
app.config(config)

forEach(services, (fn, name) => app.service(name, fn))
forEach(containers, (fn, name) => app.component(name, fn))
forEach(components, (fn, name) => app.component(name, fn))

app
  .config(routes)
  .run(init)
