import Session from '../models/session';

export default {
  name: 'session',
  before: 'currentUser',

  initialize: function (container, app) {
    var store = container.lookup('store:main');

    Session.reopen({
      store: store
    });

    app.register('session:main', Session, { singleton: true });
    app.inject('application', 'session', 'session:main');
    app.inject('adapter', 'session', 'session:main');
    app.inject('route', 'session', 'session:main');
    app.inject('controller', 'session', 'session:main');
    app.inject('view', 'session', 'session:main');
    app.inject('application', 'session', 'session:main');
  }
};