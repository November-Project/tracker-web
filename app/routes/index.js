import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  afterModel: function () {
    this.transitionTo('events').then( (route) => {
      const controller = route.controllerFor('events');
      controller.set('date', null);
      controller.resetCalendar();
    });
  }
});
