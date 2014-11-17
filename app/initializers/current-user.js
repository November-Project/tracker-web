export default {
  name: 'currentUser',
  after: 'store',

  initialize: function (container, app) {
    var store = container.lookup('store:main');
    var session = container.lookup('session:main');

    if (session.getToken()) {
      app.deferReadiness();
      session.fetchUser().finally( function () {
        app.advanceReadiness();
      });
    }
  }
};