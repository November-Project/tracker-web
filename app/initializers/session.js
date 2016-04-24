export function initialize (app) {
  app.inject('adapter', 'session', 'service:session');
  app.inject('route', 'session', 'service:session');
  app.inject('controller', 'session', 'service:session');
  app.inject('service:auth', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize
};
