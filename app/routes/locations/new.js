import AdministrationRoute from '../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('location');
  },

  beforeModel: function () {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (!window.google) {
        window.mapAPILoaded = Ember.run.bind(resolve);
        Ember.$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E&sensor=false&callback=mapAPILoaded').fail(reject);
      } else {
        resolve();
      }
    });
  },

  afterModel: function (model) {
    var tribe = this.get('session').getTribe();
    model.set('latitude', tribe.get('latitude'));
    model.set('longitude', tribe.get('longitude'));
    model.set('tribe', tribe);
  },

  setupController: function (controller, model) {
    this.controllerFor('locations.edit').setProperties({ model: model });
  },

  renderTemplate: function () {
    this.render('locations/edit');
  }
});
