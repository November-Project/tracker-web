/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'novproject',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.FACEBOOK_API_VERSION = 'v2.5';

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.API_HOST = "http://192.168.99.100:3000";
    ENV.FACEBOOK_APP_ID = '577189602429829';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.FACEBOOK_APP_ID = '577189602429829';
    ENV.API_HOST = "https://novproject-staging.herokuapp.com";
  }

  if (environment === 'production') {
    ENV.FACEBOOK_APP_ID = '188733467942113';
    ENV.API_HOST = "https://novproject-production.herokuapp.com";
  }

  return ENV;
};
