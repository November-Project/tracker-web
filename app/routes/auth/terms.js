import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    const session = this.get('session');
    return session.fetchUser().finally( () => {
      if (session.hasAcceptedTerms()) {
        this.transitionTo('index');
      }
    });
  },

  model: function () {
    return this.get('session').get('user');
  }
});
