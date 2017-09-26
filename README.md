# Yeoman generator for AngularJS by DSR Corporation    

## Table of contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Run](#run)
- [Architecture](#architecture)
  - [Components and partials](#components-and-partials)
  - [LESS](#less)
  - [Optional features](#optional-features)
- [Defaults](#defaults)
- [Release scripts](#release-scripts)
- [License](#license)

## Prerequisites

- NPM    
- YARN    
- Yeoman    

## Install

```
npm install -g generator-angular-dsr
yo angular-dsr
```
During the installation process you are going to be asked a few questions whether to include some features or not. 
When Yeoman generates the app it's going to install Bower and NPM dependency for you.

## Run

Serves your app with [WebPack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html) in development mode
```
npm start
```

Build your app for production
```
npm build
```

## Architecture

The app is represented with six groups of files:
- components 
- containers       
- constants    
- dialogs    
- services    
- routes    
- styles      
- core (located in the root)   

### Components and containers

Components and containers define your view layer. As components are concerned more with how things look, containers are bothered with how they work. There's a great [article by Dan Abramov on this topic](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

### LESS

As there is no major reasons to choose LESS over SASS or otherwise it's been decided to go with LESS.
It's recommended to use BEM-like naming for your styles.

LESS styles are spread across the files:
- angular-loader-override
  - Set of styles to override the color scheme of angular-loader.
- base
  - Set of general styles applied to the basic elements of your whole app.
- buttons
  - Set of styles for your buttons.
- constants
  - Set of LESS constants to keep your styles consistent. Usually there are a limited amount of colors, animation durations and margins/padding (corresponding to your base grid) in your app. It's recommended to keep these values here.
- fonts
  - Set of font-face styles to load custom fonts.
- icons
  - Set of icon-specific styles.
- inputs
  - Set of styles for your inputs and forms.
- modificators
  - Set of common styles could be applied across your whole app. It includes sets of styles for usual margins/paddings, font and background colors, heights and widths corresponding your grid and etc.

These are app wide styles which create your general CSS framework.

### Features

- JWT support
  - security
    - service providing sign-in, sign-out, check sign-in and other security jwt-related API.
  - security-interceptor
    - http interceptor adding jwt token to every request and saving it with every response (Authorization Bearer header is used).
- Set of basic components
  - checkbox
  - dropdown (select)
  - error
  - radio-button
  - svg-icon
- Set of tools to develop responsive UI
  - [angular-responsive-breakpoints](https://github.com/keenondrums/angular-responsive-breakpoints) 
    - Injected in the $rootScope in the index.run.js and can be accessed across your whole app via screen.
- Detect a browser back button click
  - Detects if a user clicks a browser back button providing a possibility to apply custom handler for this occasion in index.run.js.
- Autoscroll to the top
  - Overrides Angular's default preserve scroll position between states feature and scrolls a user's screen to the top on each state change.
- Detect if a user scrolls all the way to the bottom
  - Broadcasts 'ui.scrollbarIsOnBottom' if a scrollbar is on the bottom of the screen
- A script to upgrade all dependencies    
  - Run 'npm run upgrade-dependencies'    

## Defaults

- Logging
  - Debug mode is enabled in config
- URLs
  - HTML5 mode is enabled in config
- Dialogs
  - Constant with dialog close codes added to index.constants.js
  ```
  'dialogButtons', {
      CANCEL: 0,
      OK: 1,
      YES: 2,
      NO: 3
    }
  ```
- Handling state change errors
  - errorHelpers.handleBackendError is invoked if any error caught, redirect to your home page happens otherwise
- Different constants for production, development and testing
  - By default development and production constants are provided with 'apiRoot' injected
- Dependencies' versions
  - NPM
  ```
  "@iamadamjowett/angular-click-outside": "^2.10.1"
  "@uirouter/angularjs": "^1.0.6"
  "angular": "^1.6.6"
  "angular-animate": "^1.6.6"
  "angular-loading-bar": "^0.9.0"
  "angular-local-storage": "^0.7.1"
  "angular-messages": "^1.6.6"
  "angular-resource": "^1.6.6"
  "angular-responsive-breakpoints": "^0.2.0"
  "angular-sanitize": "^1.6.6"
  "lodash": "^4.17.4"
  "moment": "^2.18.1"
  "moment-timezone": "^0.5.13"
  "ng-dialog": "^1.4.0"
  "normalize-css": "^2.3.1"
  "randomstring": "^1.1.5
  ```
- Code validation
  - Build automatically fails if any errors found
- Version
  - Current web app version is injected in widow as appVersion

## Release scripts

These scripts automate version increment flow via a separate version-inc branch, helping you bring your latest changes to the master and put a tag on it.      

Prerequisites:    
- You have local develop and master branches
- You have develop and master branhces in your origin
- Current branch is develop with the latest changes merged in     

Scripts are provided by default:    
- version-patch
- version-minor
- version-major   

Run a script with (it's better to run them from Git Bash to avoid entering a password to your ssh key for every command)
```
npm run version-patch
npm run version-minor
npm run version-major
```
For Unix-based systems add "-b" (for Bash) postfix:
```
npm run version-patch-b
npm run version-minor-b
npm run version-major-b
```

Each of these scripts follows the following flow:   
- Creates a branch named 'version-inc' and checks it out
- Increments version in package.json and bower.json
- Pushes updated files to origin
- Merges develop with version-inc branch
- Deletes version-inc branch
- Merges master with develop
- Adds tag 'x.x.x' to master 

## License
The MIT License (MIT)

Copyright (c) 2016 DSR Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

