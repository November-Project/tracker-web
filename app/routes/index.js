import AuthenticationRoute from './authentication';
import Ember from 'ember';

export default AuthenticationRoute.extend({
  afterModel: function () {
    this.transitionTo('events').then( (route) => {
      const controller = route.controllerFor('events')
      controller.set('reset', true);
      controller.set('date', null);
    });
  }
});
