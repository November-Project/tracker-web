import AdministrationRoute from '../../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  actions: {
    openEvent: function (event, date) {
      if (event === 'new') {
        this.transitionTo('admin.events.new', { queryParams: { date } });
      } else if (Ember.isPresent(event.get('recurringEvent'))) {
        this.set('selectedEvent', event);
        Ember.$('#recurring-event-modal').modal();
      } else {
        this.transitionTo('admin.events.edit', event.id);
      }
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').query('event', { start_date, end_date }).then( (events) => {
        callback(events.reduce( (accum, event) => {
          return accum.pushObjects(event.get('timesArray').map( (time) => {
            return {
              model: event,
              title: event.get('displayTitle'),
              start: moment(event.get('date').format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD HH:mm')
            };
          }));
        }, []));
      });
    },

    editRecurringEvent: function () {
      Ember.$('#recurring-event-modal').modal('hide');
      this.transitionTo('admin.events.edit', this.get('selectedEvent.recurringEvent'));
    },

    editThisEvent: function () {
      Ember.$('#recurring-event-modal').modal('hide');
      this.transitionTo('admin.events.edit', this.get('selectedEvent.id'));
    }
  }
});
