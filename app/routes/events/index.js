import AdministrationRoute from '../administration';
import Ember from 'ember';
import _ from 'lodash';

export default AdministrationRoute.extend({
  daysArray: Ember.computed({
    get: function () {
      return _.map(this.get('session.tribe.daysOfWeek').split(',').filter(Ember.isPresent), function (v) { return parseInt(v); });
    }
  }),

  actions: {
    openEvent: function (event, date) {
      if (event === 'new') {
        this.transitionTo('events.new').then( (newRoute) => {
          newRoute.currentModel.event.set('date', date);
          newRoute.currentModel.event.set('tribe', this.get('session.tribe'));
        });
      } else {
        this.transitionTo('events.edit', event);
      }
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').query('event', { start_date, end_date }).then( (events) => {
        callback(events.map( (event) => {
          return {
            id: event.id,
            title: event.get('title'),
            start: event.get('date')
          };
        }));
      });
    },

    getSchedule: function (callback) {
      callback(this.get('daysArray'));
    },

    isValidDay: function (day, success) {
      if (this.get('daysArray').contains(day)) { success(); }
    }
  }
});
