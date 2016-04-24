import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInWithFacebook: function () {
      const btn = Ember.$('#facebook-btn');
      btn.button('loading');

      this.auth.loginWithFacebook().then( () => {
        this.transitionTo('index');
      }).finally( () => { btn.button('reset'); });
    }
  }
});
