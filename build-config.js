/**
 * Build configuration for the packaging tool. This file will be automatically detected and used
 * to build the different packages inside of Layout.
 */
const { join } = require('path');

const packageJson = require('./package.json');

/** Current version of the project*/
const buildVersion = packageJson.version;

/**
 * Required Angular version for all Angular Layout packages. This version will be used
 * as the peer dependency version for Angular in all release packages.
 */
const angularVersion = packageJson.requiredAngularVersion;

module.exports = {
  projectVersion: buildVersion,
  angularVersion: angularVersion,
  projectDir: __dirname,
  packagesDir: join(__dirname, 'src'),
  outputDir: join(__dirname, 'dist'),
};
