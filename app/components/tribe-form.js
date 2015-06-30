/* global google */
import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  savable: function () {
    return this.get('model.isDirty') && this.get('model.title') !== "" && this.get('model.title') !== undefined;
  }.property('model.title', 'model.isDirty'),

  cleanup: function () {
    const tribe = this.get('model');

    if (tribe.get('isNew')) {
      tribe.destroyRecord();
    } else {
      tribe.rollback();
    }
  }.on('willDestroyElement'),

  cityChanged: function () {
    Ember.run.debounce(this, this.geocode, 1000);
  }.observes('model.title'),

  mapChanged: function () {
    Ember.run.debounce(this, this.reverseGeocode, 1000);
  }.observes('model.latitude', 'model.longitude'),

  geocoder: new google.maps.Geocoder(),

  geocode: function () {
    this.geocoder.geocode({ address: this.get('model.title') }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        var latLng = results[0].geometry.location;
        this.set('model.latitude', latLng.lat());
        this.set('model.longitude', latLng.lng());
      }
    });
  },

  reverseGeocode: function () {
    var latLng = new google.maps.LatLng(this.get('model.latitude'), this.get('model.longitude'));
    this.geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var city = _.find(results[0].address_components, (value) => {
            return _.contains(value.types, 'locality');
          }).long_name;

          var state = _.find(results[0].address_components, (value) => {
            return _.contains(value.types, 'administrative_area_level_1');
          });

          var country = _.find(results[0].address_components, (value) => {
            return _.contains(value.types, 'country');
          });

          var title = city + ', ' + (state || country).short_name;
          this.set('model.title', title);
        }
      }
    });
  },

  actions: {
    save: function () {
      this.sendAction();
    },

    cancel: function () {
      this.sendAction('cancel');
    }
  }
});
