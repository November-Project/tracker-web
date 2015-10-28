import AdministrationRoute from '../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  model: function () {
    const start_date = moment().subtract(1, 'year').format('YYYY-MM-DD');
    const end_date = moment().format('YYYY-MM-DD');
    return this.store.query('event', { start_date, end_date });
  },

  afterModel: function () {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (!window.google) {
        window.mapAPILoaded = Ember.run.bind(resolve);
        Ember.$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E&libraries=visualization&sensor=false&callback=mapAPILoaded').fail(reject);
      } else {
        resolve();
      }
    });
  }
});
