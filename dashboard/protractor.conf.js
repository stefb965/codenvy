'use strict';

var paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--lang=en',
        '--window-size=1024,768']
    }
  },

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // This can be changed via command line as:
  // --params.login.user='valid-login' --params.login.password='valid-password'
  params: {
    login: {
      user: 'fake-login',
      password: 'fake-password'
    },
    fakeLogin: {
      user: 'fake-login',
      password: 'fake-password'
    }
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
