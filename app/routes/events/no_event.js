import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  setupController: function (controller, model) {
    this._super(controller, model);
    const selected = this.controllerFor('events').get('selected');
    this.controller.set('date', selected);
  }
});
