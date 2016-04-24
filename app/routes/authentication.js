import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if (this.session.isAuthenticated()) {
      return this.auth.fetchUser().then( () => {
        if (!this.session.hasAcceptedTerms()) {
          this.transitionTo('auth.terms');
        }
      });
    } else {
      this.transitionTo('auth');
    }
  },

  actions: {
    logout: function () {
      this.auth.logout().then( () => {
        this.transitionTo('auth');
      });
    }
  }
});
