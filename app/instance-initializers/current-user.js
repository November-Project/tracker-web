export function initialize (instance, app) {
  var session = instance.container.lookup('session:main');

  if (session.get('_token')) {
    app.deferReadiness();
    session.fetchUser().finally( function () {
      app.advanceReadiness();
    });
  }
}

export default {
  name: 'currentUser',
  initialize: initialize
};
