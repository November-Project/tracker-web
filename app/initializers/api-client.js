export function initialize(app) {
  app.inject('route', 'client', 'service:apiClient');
  app.inject('controller', 'client', 'service:apiClient');
  app.inject('component', 'client', 'service:apiClient');
  app.inject('service:apiClient', 'session', 'service:session');
}

export default {
  name: 'apiClient',
  after: 'session',
  initialize
};
