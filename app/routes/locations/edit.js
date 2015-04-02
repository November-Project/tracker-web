import Ember from 'ember';
import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function(params) {
    return this.store.find('location', params.location_id);
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

  actions: {
    save: function () {
      var model = this.get('controller.model');
      model.set('latitude', model.get('latitude').toFixed(6));
      model.set('longitude', model.get('longitude').toFixed(6));

      model.save().then( () => {
        this.replaceWith('locations.index');
      }, function (err) {
        console.log(err);
      });
    }
  }
});
