import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    if (session.isAuthenticated()) {
      this.transitionTo('index');
    }
  },

  actions: {
    signInWithFacebook: function () {
      var route = this;
      var controller = this.controllerFor('auth');

      this.get('torii').open('facebook-connect').then( function (auth) {
        route.get('session').openWithFacebook(auth).finally( function () {
          route.transitionTo('index');
        });
      }, function (error) {
        console.log(error);
        controller.set('error', 'Could not sign you in: ' + error.message);
      });
    }
  }
});