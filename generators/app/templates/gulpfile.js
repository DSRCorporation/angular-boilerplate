/* eslint-env node */
'use strict'; // eslint-disable-line

/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split in several files in the gulp directory
 *  because putting all here was really too long
 */

const gulp = require('gulp'), // eslint-disable-line
  wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp')
  .filter((file) => (/\.(js|coffee)$/i).test(file))
  .map((file) => require('./gulp/' + file));
