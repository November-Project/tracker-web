import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    const session = this.get('session');
    if (session.isAuthenticated() && session.hasAcceptedTerms()) {
      this.transitionTo('index');
    }
  }
});
