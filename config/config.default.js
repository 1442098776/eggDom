/* eslint valid-jsdoc: "off" */
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1609988528763_4368';

  // add your middleware config here
  config.middleware = [
    'auth'
  ];
  config.auth = {
    secret: '123456',
    expiresIn: '12h',
    router: ['/register', '/login']
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/example',
      options: {
        useUnifiedTopology: true
      }
    }
  }
  config.jwt = {
    secret: '123456',
    expiresIn: '12h'
  }

  return {
    ...config,
    ...userConfig
  };
};
