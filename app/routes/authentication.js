import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    if (session.isAuthenticated()) {
      var self = this;
      return session.fetchUser().finally( function () {
        if (!session.hasAcceptedTerms()) {
          self.transitionTo('auth.terms');
        }
      });
    } else {
      this.transitionTo('auth');
    }
  },

  actions: {
    logout: function () {
      var self = this;
      this.get('session').logout().then( function () {
        self.transitionTo('auth');
      });
    }
  }
});