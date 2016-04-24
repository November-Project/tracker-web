export function initialize(app) {
  app.inject('route', 'auth', 'service:auth');
  app.inject('controller', 'auth', 'service:auth');
  app.inject('component', 'auth', 'service:auth');
  app.inject('service:auth', 'session', 'service:session');
  app.inject('service:auth', 'store', 'service:store');
  app.inject('service:auth', 'client', 'service:apiClient');
}

export default {
  name: 'auth',
  after: 'apiClient',
  initialize
};
