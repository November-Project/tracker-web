import SuperAdministrationRoute from '../super-administration';
import Ember from 'ember';

export default SuperAdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('tribe', { title: '', latitude: 0, longitude: 0 });
  },

  beforeModel: function () {
    this._super();
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

      model.save().then( () => {
        this.transitionTo('tribes.index');
      }, function (err) {
        console.log(err);
      });
    },

    cancel: function () {
      this.transitionTo('tribes.index');
    }
  }
});
