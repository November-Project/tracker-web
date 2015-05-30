import AdministrationRoute from './administration';

export default AdministrationRoute.extend({
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor('locations').set('model', this.store.all('location'));
  }
});
