import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInWithFacebook: function () {
      var route = this;
      var controller = this.controllerFor('auth');

      this.get('session').open('facebook-connect').then( function () {
        route.transitionTo('index', 0);
      }, function (error) {
        console.log(error);
        controller.set('error', 'Could not sign you in: ' + error.message);
      });
    }
  }
});