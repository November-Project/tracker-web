import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['workout'],

  isEventPresent: Ember.computed('event', {
    get: function () {
      return Ember.isPresent(this.get('event'));
    }
  }),

  displayDate: Ember.computed({
    get: function () {
      return this.get('event.date').format('ddd, MMM D YYYY');
    }
  }),

  displayTitle: Ember.computed({
    get: function () {
      return this.get('event.title');
    }
  }),

  displayTimes: Ember.computed({
    get: function () {
      return this.get('event.times').split(',').map( function (time) {
        return moment(time, 'H:mm').format('h:mm A');
      }).join(', ');
    }
  }),

  mapLink: Ember.computed({
    get: function () {
      const lat = this.get('event.location.latitude');
      const lng = this.get('event.location.longitude');
      return 'http://maps.google.com/?q=loc:' + lat + ',' + lng + '&z=14&t=h';
    }
  })
});
