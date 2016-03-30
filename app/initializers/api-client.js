import Client from '../helpers/api-client';

export function initialize (app) {
  app.register('client:main', Client);
  app.inject('application', 'client', 'client:main');
  app.inject('adapter', 'client', 'client:main');
  app.inject('route', 'client', 'client:main');
  app.inject('controller', 'client', 'client:main');
}

export default {
  name: 'client',
  initialize: initialize
};
