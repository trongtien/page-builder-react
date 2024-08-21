// @remove-on-eject-begin

// @remove-on-eject-end
'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('./utils');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('./src/App'),
  template: resolveApp('./public/index.html'),
  favicon: resolveApp('./public/favicon.png'),
  filename: resolveApp('./dist/index.html'),
  configJson: resolveApp('./config.json'),
  packageJson: resolveApp('./package.json'),
  languages: resolveApp('./public/locales'),
  inputBuilder: resolveApp('./src/index.js'),
  outputBuilder: resolveApp('./dist'),
  publicUrlOrPath,
};
