import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    const session = this.get('session');
    if (session.isAuthenticated()) {
      return session.fetchUser().then( () => {
        if (!session.hasAcceptedTerms()) {
          this.transitionTo('auth.terms');
        }
      });
    } else {
      this.transitionTo('auth');
    }
  },

  actions: {
    logout: function () {
      this.get('session').logout().then( () => {
        this.transitionTo('auth');
      });
    }
  }
});
