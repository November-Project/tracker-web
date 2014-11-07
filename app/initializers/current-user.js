var CurrentUserInitializer = {
  name: 'currentUser',
  after: 'store',

  initialize: function (container, app) {
    var session = container.lookup('session:main');

    app.register('user:current', (function () {
      return this.get('session.currentUser');
    }).property('session.currentUser'), { instantiate: false, singleton: true });

    if (session.get('token')) {
      app.deferReadiness();
      session.findCurrentUser().finally( function () {
        app.advanceReadiness();
      });
    }

    app.inject('route', 'currentUser', 'user:current');
    app.inject('controller', 'currentUser', 'user:current');
    app.inject('adapter', 'currentUser', 'user:current');
  }
};

export default CurrentUserInitializer;