/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const getAddons = addonsArgs => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];
  return addons.filter(Boolean).map(name => require(`./addons/webpack.${name}.js`));
};

module.exports = ({env, addon}) => {
  const envConfig = require(`./webpack.${env}.js`);
  // console.log('paths.publicUrlOrPath', paths.publicUrlOrPath);
  // const envTest = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
  // console.log('envTest__', envTest);
  // console.log('envConfig__', envConfig);
  return merge(commonConfig, envConfig, ...getAddons(addon));
};
