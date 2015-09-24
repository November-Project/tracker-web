/* global google */
import Ember from 'ember';

export default Ember.Controller.extend({
  latitude: Ember.computed.alias('session.tribe.latitude'),
  longitude: Ember.computed.alias('session.tribe.longitude'),

  locations: Ember.computed({
    get: function () {
      return this.get('model').filterBy('recurring', false).map( (event) => {
        const lat = event.get('location.latitude');
        const lng = event.get('location.longitude');
        return new google.maps.LatLng(lat, lng);
      });
    }
  })
});
