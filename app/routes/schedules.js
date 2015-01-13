import AdministrationRoute from './administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').find('schedule');
  },

  afterModel: function () {
    return this.store.find('location');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor('locations').set('content', this.store.all('location'));
  }
});
