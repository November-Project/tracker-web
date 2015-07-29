import AdministrationRoute from '../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session._tribe');
    const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
    return this.store.createRecord('location', { tribe, longitude, latitude });
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
  }
});
