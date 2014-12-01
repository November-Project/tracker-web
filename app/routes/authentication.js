import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    console.log(session.isAuthenticated());
    if (!session.isAuthenticated()) {
      this.transitionTo('auth');
    } else if (!session.hasAcceptedTerms()) {
      this.transitionTo('auth.terms');
    }
  },

  actions: {
    logout: function () {
      this.get('session').logout().then( function () {
        this.transitionTo('auth');
      }).bind(this);
    }
  }
});