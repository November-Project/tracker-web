import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    console.log(session);
    if (!session.isAuthenticated()) {
      this.transitionTo('auth');
    } else if (!session.hasAcceptedTerms()) {
      this.transitionTo('auth.terms');
    }
  }
});