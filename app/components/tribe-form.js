/* global google */
import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  savable: Ember.computed('model.title', 'model.hasDirtyAttributes', 'model.timezone', {
    get: function () {
      return this.get('model.hasDirtyAttributes') &&
        Ember.isPresent(this.get('model.title')) &&
        Ember.isPresent(this.get('model.timezone'));
    }
  }),

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
    this.set('model.timezone', null);
    console.log('fire');
    // Ember.run.debounce(this, this.lookupTimezone, 2000);
  }.observes('model.latitude'),

  geocoder: new google.maps.Geocoder(),

  geocode: function () {
    this.geocoder.geocode({ address: this.get('model.title') }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        var latLng = results[0].geometry.location;
        this.set('model.latitude', latLng.lat().toFixed(6));
        this.set('model.longitude', latLng.lng().toFixed(6));
        Ember.run.debounce(this, this.lookupTimezone, 2000);
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

  lookupTimezone: function () {
    const timestamp = Date.now() / 1000;
    const lat = this.get('model.latitude');
    const lng = this.get('model.longitude');
    Ember.$.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp="+timestamp+"&key=AIzaSyCYKDmsSlu_GNmW5OHDv_R8VZzhQpHEW9E", (data) => {
      this.set('model.timezone', data.timeZoneId);
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
