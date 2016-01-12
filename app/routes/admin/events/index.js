import AdministrationRoute from '../../administration';
import Ember from 'ember';
import RecurringEvents from '../../../helpers/recurring-events';

export default AdministrationRoute.extend({
  actions: {
    openEvent: function (event, date) {
      if (event === 'new') {
        this.transitionTo('admin.events.new', { queryParams: { date } });
      } else if (Ember.isPresent(event.recurring)) {
        this.set('selectedDate', date);
        this.set('selectedEvent', event.recurring);
        Ember.$('#recurring-event-modal').modal();
      } else {
        this.transitionTo('admin.events.edit', event.model);
      }
    },

    getEvents: function (callback, start_date, end_date) {
      Ember.RSVP.hash({
        events: this.get('store').query('event', { start_date, end_date }),
        recurring: this.get('store').findAll('recurring')
      }).then( (hash) => {
        let events = hash.events.reduce( (accum, event) => {
          return accum.pushObjects(event.get('timesArray').map( (time) => {
            return {
              model: event,
              title: event.get('displayTitle'),
              start: moment(event.get('date').format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD HH:mm')
            };
          }));
        }, []);

        // create all recurring events between start_date and end_date that are also in the future
        let takenDates = hash.events.map( (event) => { return event.get('date').format('YYYY-MM-DD') });
        let recurrings = _.sortBy(hash.recurring.toArray(), (recurring) => {
          return -1 * Math.abs(recurring.get('week'));
        }).reduce( (accum, recurring) => {
          return accum.pushObjects(RecurringEvents.eventsFromRecurring(recurring, start_date, end_date, takenDates));
        }, []);

        callback(events.pushObjects(recurrings));
      });
    },

    editRecurringEvent: function () {
      Ember.$('#recurring-event-modal').modal('hide');
      this.transitionTo('admin.recurring.edit', this.get('selectedEvent.id'));
    },

    editThisEvent: function () {
      Ember.$('#recurring-event-modal').modal('hide');
      let date = this.get('selectedDate');
      this.transitionTo('admin.events.new', { queryParams: { date } }).then( (newRoute) => {
        RecurringEvents.recurringToEvent(this.get('selectedEvent'), newRoute.controller.get('model'));
      });
    }
  }
});
