import Ember from 'ember'
import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').createRecord('event');
  },

  afterModel: function () {
    return Ember.RSVP.all([
      this.store.find('location'),
      this.store.find('workout')
    ]);
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor('locations').set('model', this.store.all('location'));
    this.controllerFor('workouts').set('model', this.store.all('workout'));
  }
});
