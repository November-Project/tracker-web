import AdministrationRoute from '../../administration';
import Ember from 'ember';

export default AdministrationRoute.extend({
  actions: {
    openEvent: function (event, date) {
      if (event === 'new') {
        this.transitionTo('admin.events.new').then( (newRoute) => {
          newRoute.currentModel.event.set('date', date);
          newRoute.currentModel.event.set('tribe', this.get('session.tribe'));
        });
      } else if (Ember.isPresent(event.get('recurringEvent'))) {
        this.set('selectedEvent', event);
        Ember.$('#recurring-event-modal').modal()
      } else {
        this.transitionTo('admin.events.edit', event.id);
      }
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').query('event', { start_date, end_date }).then( (events) => {
        callback(events.map( (event) => {
          return {
            model: event,
            title: event.get('title'),
            start: event.get('date')
          };
        }));
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
