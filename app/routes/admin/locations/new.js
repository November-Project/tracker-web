import AdministrationRoute from '../../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session.tribe');
    const { longitude, latitude } = tribe.getProperties('longitude', 'latitude');
    return this.store.createRecord('location', { tribe, longitude, latitude });
  },

  beforeModel: function () {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (!window.google) {
        window.mapAPILoaded = Ember.run.bind(resolve);
        Ember.$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E&libraries=visualization&sensor=false&callback=mapAPILoaded').fail(reject);
      } else {
        resolve();
      }
    });
  },

  actions: {
    save: function () {
      var model = this.get('controller.model');
      model.set('latitude', model.get('latitude').toFixed(6));
      model.set('longitude', model.get('longitude').toFixed(6));

      model.save().then( () => {
        this.transitionTo('admin.locations.index');
      });
    },

    cancel: function () {
      if (window.history.length > 0) { window.history.back(); }
      else { this.transitionTo('admin.locations'); }
    }
  }
});
