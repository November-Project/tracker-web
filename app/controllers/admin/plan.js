/* global google */
/* global _ */
import Ember from 'ember';

export default Ember.Controller.extend({
  latitude: Ember.computed.alias('session.tribe.latitude'),
  longitude: Ember.computed.alias('session.tribe.longitude'),

  locations: Ember.computed('daysOfWeek.@each.checked', {
    get: function () {
      const days = this.get('daysOfWeek').filterBy('checked', true).mapBy('value');
      return this.get('model').filterBy('recurring', false).filter( (event) => {
        const day = parseInt(moment(event.get('date'), 'YYYY-MM-DD').format('e'), 10);
        return _.contains(days, day);
      }).map( (event) => {
        const lat = event.get('location.latitude');
        const lng = event.get('location.longitude');
        return new google.maps.LatLng(lat, lng);
      });
    }
  }),

  daysOfWeek: Ember.computed.map('session.tribe.daysOfWeekArray', function (day) {
    const letterForDay = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
    const wordForDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return Ember.Object.create({
      value: day,
      letter: letterForDay[day],
      word: wordForDay[day],
      checked: true
    });
  })
});
