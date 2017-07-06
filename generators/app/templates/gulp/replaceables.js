'use strict';

const fs = require('fs'),
  prefix = '12WebApp',
  env = require('./env'),
  gulpCurrentMode = env.gulpCurrMode,
  gulpModes = env.gulpModes;

const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const prefixTarget = (target) => quoteWrap(prefix + target);
const quoteWrap = (val) => '\'' + val + '\'';
const version = () => quoteWrap(packageJson.version);
const debugEnabled = () => gulpCurrentMode() !== gulpModes.prod;

module.exports = [
  {
    target: prefixTarget('Version'),
    value: version,
    constraint: /index.constants.js$/,
  },
  {
    target: prefixTarget('DebugEnabled'),
    value: debugEnabled,
    constraint: /index.config.js$/,
  },
];
