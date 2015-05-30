import Ember from 'ember';
import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return Ember.RSVP.hash({
      event: this.store.createRecord('event'),
      workouts: this.store.find('workout'),
      locations: this.store.find('location'),
    });
  },

  afterModel: function () {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (!window.google) {
        window.mapAPILoaded = Ember.run.bind(resolve);
        Ember.$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E&sensor=false&callback=mapAPILoaded').fail(reject);
      } else {
        resolve();
      }
    });
  },

  cleanupController: function () {
    this.controller.cleanup();
  }.on('deactivate')
});
