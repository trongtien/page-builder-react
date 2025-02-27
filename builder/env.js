'use strict';

const fs = require('fs');
const paths = require('./paths');
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const dotenvFiles = [`${paths.dotenv}.${NODE_ENV}.local`, `${paths.dotenv}.${NODE_ENV}`].filter(Boolean);

dotenvFiles.forEach(envFile => {
  if (fs.existsSync(envFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFiles,
      })
    );
  }
});

const BASEBS_APP = /^BASEBS_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => BASEBS_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return {raw, stringified};
}

module.exports = getClientEnvironment;
