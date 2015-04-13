import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').find('schedule');
  },

  actions: {
    openEvent: function (event) {
      this.transitionTo('events', event);
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').find('event', { start_date, end_date }).then( (events) => {
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
      this.get('store').find('schedule').then( (model) => {
        var days = model.map( (schedule) => {
          return schedule.get('displayDay').toLowerCase();
        });
        callback(days);
      });
    }
  }
});
