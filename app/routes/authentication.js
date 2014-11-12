import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    console.log(session.isAuthenticated);
    if (!session.isAuthenticated) {
      this.transitionTo('auth');
    }
  }
});