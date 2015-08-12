import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  actions: {
    openEvent: function (event, date) {
      if (event === 'new') {
        this.transitionTo('events.new').then( (newRoute) => {
          newRoute.currentModel.event.set('date', date);
          newRoute.currentModel.event.set('tribe', this.get('session._tribe'));
        });
      } else {
        this.transitionTo('events.edit', event);
      }
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').findAll('event', { start_date, end_date }).then( (events) => {
        callback(events.map( (event) => {
          return {
            id: event.id,
            title: event.title,
            start: event.get('date')
          };
        }));
      });
    },

    getSchedule: function (callback) {
      callback(this.get('session._tribe.daysOfWeek'));
    },

    isValidDay: function (day, success) {
      if (this.get('session._tribe.daysOfWeek').contains(day)) { success(); }
    }
  }
});
