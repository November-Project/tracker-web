import Ember from 'ember';
import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  isEventSelected: Ember.computed('selectedEvent', {
    get: function () {
      return Ember.isPresent(this.get('selectedEvent'));
    }
  }),

  actions: {
    getEvents: function (start_date, end_date, callback) {
      this.get('store').query('event', { start_date, end_date }).then(callback);
    },

    eventSelected: function (event) {
      this.set('selectedEvent', event);
    }
  }
});
