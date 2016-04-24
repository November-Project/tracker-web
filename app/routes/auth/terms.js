import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.auth.fetchUser().finally( () => {
      if (this.session.hasAcceptedTerms()) {
        this.transitionTo('index');
      }
    });
  },

  model: function () {
    return this.get('session.user');
  }
});
