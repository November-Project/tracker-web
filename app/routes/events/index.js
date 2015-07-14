import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  actions: {
    openEvent: function (event) {
      if (event === 'new') {
        this.transitionTo('events.new');
      } else {
        this.transitionTo('events.edit', event);
      }
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
      const tribe = this.get('session').getTribe();
      var days = tribe.get('daysOfWeek').map( (day) => {
        switch (day) {
          case 0: return 'Sun';
          case 1: return 'Mon';
          case 2: return 'Tue';
          case 3: return 'Wed';
          case 4: return 'Thu';
          case 5: return 'Fri';
          case 6: return 'Sat';
        }
      });
      callback(days);
    }
  }
});
