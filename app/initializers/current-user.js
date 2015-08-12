export default {
  name: 'currentUser',
  after: 'store',

  initialize: function (instance, app) {
    var session = instance.container.lookup('session:main');

    if (session.get('_token')) {
      app.deferReadiness();
      session.fetchUser().finally( function () {
        app.advanceReadiness();
      });
    }
  }
};
