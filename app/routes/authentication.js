import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function (transition) {
    var session = this.get('session');
    if (!session.get('token')) {
      this.transitionTo('auth');
    }
  }
});