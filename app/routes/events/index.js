import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
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
          console.log(event.get('tribe'));
          console.log(event.get('workout'));
          console.log(event.get('location'));
          return {
            id: event.id,
            title: event.get('title'),
            start: event.get('date')
          };
        }));
      });
    },

    getSchedule: function (callback) {
      callback(this.get('session.tribe.daysOfWeek'));
    },

    isValidDay: function (day, success) {
      if (this.get('session.tribe.daysOfWeek').contains(day)) { success(); }
    }
  }
});
