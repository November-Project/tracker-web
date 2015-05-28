import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').createRecord('event');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor('locations').set('content', this.store.find('location'));
    this.controllerFor('workouts').set('content', this.store.find('workout'));
  }
});
