/* global google */
/* global _ */
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  savable: Ember.computed('model.title', 'model.hasDirtyAttributes', 'model.timezone', 'model.daysOfWeek', {
    get: function () {
      return this.get('model.hasDirtyAttributes') &&
        Ember.isPresent(this.get('model.title')) &&
        Ember.isPresent(this.get('model.daysOfWeek')) &&
        Ember.isPresent(this.get('model.timezone'));
    }
  }),

  latitude: Ember.computed({
    get: function () {
      return this.get('model.latitude');
    },

    set: function (key, value) {
      const fixed = value.toFixed(6);
      this.set('model.latitude', fixed);
      return fixed;
    }
  }),

  longitude: Ember.computed({
    get: function () {
      return this.get('model.longitude');
    },

    set: function (key, value) {
      const fixed = value.toFixed(6);
      this.set('model.longitude', fixed);
      return fixed;
    }
  }),

  _dayRange: _.range(7),

  daysOfWeek: Ember.computed.map('_dayRange', function (day) {
    const letterForDay = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'S'];

    return Ember.Object.create({
      value: day,
      letter: letterForDay[day],
      checked: this.get('daysArray').indexOf(day) >= 0
    });
  }),

  daysChanged: Ember.observer('daysOfWeek.@each.checked', function () {
    const days = this.get('daysOfWeek').filterBy('checked', true).mapBy('value');
    this.set('daysArray', days);
  }),

  daysArray: Ember.computed({
    get: function () {
      return _.map(this.get('model.daysOfWeek').split(','), function (v) { return parseInt(v); });
    },
    set: function (key, value) {
      this.set('model.daysOfWeek', value.join(','));
      return value;
    }
  }),

  cleanup: function () {
    const tribe = this.get('model');

    if (tribe.get('isNew')) {
      tribe.destroyRecord();
    } else {
      tribe.rollbackAttributes();
    }
  }.on('willDestroyElement'),

  cityChanged: function () {
    Ember.run.debounce(this, this.geocode, 1000);
  }.observes('model.title'),

  mapChanged: function () {
    this.set('model.timezone', null);
    Ember.run.debounce(this, this.lookupTimezone, 2000);
  }.observes('model.longitude'),

  geocoder: new google.maps.Geocoder(),

  geocode: function () {
    this.geocoder.geocode({ address: this.get('model.title') }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const latLng = results[0].geometry.location;
        this.set('latitude', latLng.lat());
        this.set('longitude', latLng.lng());
      }
    });
  },

  lookupTimezone: function () {
    const timestamp = Date.now() / 1000;
    const lat = this.get('latitude');
    const lng = this.get('longitude');
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
