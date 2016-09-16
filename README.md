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
- [License](#license)

## Prerequisites

- NPM    
- Bower    
- Yeoman      
- ESLint    

## Install

```
npm install generator-angular-dsr
yo angular-dsr
```
During the installation process you are going to be asked a few questions whether to include some features or not. 
When Yeoman generates the app it's going to install Bower and NPM dependency for you.

## Run

Serve your app with [BrowserSync](https://www.browsersync.io/) in development mode
```
gulp serve
```

Serve your app in production mode
```
gulp serve:dist
```

Build your app for production
```
gulp build
```

## Architecture

The app is represented with six groups of files:
- components    
- dialogs    
- less    
- partials    
- services    
- core (located in the root)   

### Components and partials

Partials are the main content of your app. With ui-router binding routes to specific partials you get the state tree an end-user walks back and forth.
Each partial folder contains a controller (in rare cases controller could be missing) and a template.

Components group is a set of folders, each one of these contains a component's controller, a template and specific styles (optional).
It's recommended to create a component for any duplicate UI in order to keep your app consistent. 

As AngularJS' documentation states 
> Ideally, the whole application should be a tree of components that implement clearly defined inputs and outputs, and minimize two-way data binding. That way, it's easier to predict when data changes and what the state of a component is. 

During a real world adaptation, it's been decided to keep the components only for a duplicate UI. It's been decided to allow two-way binding for primitive components which basically wrap native inputs, textboxes, selects, checkboxes and radio-buttons.

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
- style
  - Your custom styles

### Optional features

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
  - [flex-attr](https://github.com/keenondrums/flex-attr)
  - [angular-responsive-breakpoints](https://github.com/keenondrums/angular-responsive-breakpoints) 
    - Injected in the $rootScope in the index.run.js and can be accessed across your whole app via screen.
- Detect a browser back button click
  - Detects if a user clicks a browser back button providing a possibility to apply custom handler for this occasion in index.run.js.
- Autoscroll to the top
  - Overrides Angular's default preserve scroll position between states feature and scrolls a user's screen to the top on each state change.
- Detect if a user scrolls all the way to the bottom
  - Broadcasts 'ui.scrollbarIsOnBottom' if a scrollbar is on the bottom of the screen

### Defaults

- BrowserSync
  - It is used only as a web server, syncing between browsers is disabled
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
  - By default index.constants.development.js and index.constants.production.js are provided with 'apiRoot' constant injected
- Dependencies' versions
  - Bower
  ```
  "angular": "^1.5.8",
  "angular-animate": "^1.5.5",
  "angular-click-outside": "^2.8.3",
  "angular-loading-bar": "^0.9.0",
  "angular-messages": "^1.5.5",
  "angular-resource": "^1.5.7",
  "angular-sanitize": "^1.5.5",
  "angular-ui-router": "^0.3.1",
  "angular-ui-router.stateHelper": "^1.3.1",
  "lodash": "^4.13.1",
  "moment": "^2.14.1",
  "moment-timezone": "^0.5.5",
  "ngDialog": "^0.6.2",
  "normalize-css": "^4.2.0",
  "angular-local-storage": "^0.2.7",
  "angular-random-string": "^0.1.0",
  "angular-responsive-breakpoints": "^0.1.0",
  "flex-attr": "^0.1.2" 
  ```

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

