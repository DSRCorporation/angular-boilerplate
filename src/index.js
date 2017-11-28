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
import ngMessages from 'angular-messages'

import init from 'init'
import routes from 'routes'
import config from 'config'
import services from 'services'
import components from 'components'
import containers from 'containers'
import decorators from 'decorators'

import ndDialogBaseStyles from 'ng-dialog/css/ngDialog.css' // eslint-disable-line
import ndDialogThemeStyles from 'ng-dialog/css/ngDialog-theme-default.css' // eslint-disable-line

import styles from 'index.less' // eslint-disable-line

// This module does not support ES6 imports
require('@iamadamjowett/angular-click-outside')
const clickOutside = 'angular-click-outside'

const app = angular
  .module('angularjs-sample-project-dsr', [
    ngSanitize,
    ngAnimate,
    ngResource,
    ngMessages,
    ngDialog,
    loadingBar,
    uiRouter,
    localStorage,
    responsiveBreakpoints,
    clickOutside
  ])
app.config(config)

forEach(services, (fn, name) => app.service(name, fn))
forEach(containers, (fn, name) => app.component(name, fn))
forEach(components, (fn, name) => app.component(name, fn))
forEach(decorators, (decorator, serviceName) => app.decorator(serviceName, decorator))

app
  .config(routes)
  .run(init)
