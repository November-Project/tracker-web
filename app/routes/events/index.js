import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').find('schedule');
  },

  actions: {
    openEvent: function (event) {
      console.log(event);
      this.transitionTo('events', event);
    },

    getEvents: function (callback, start_date, end_date) {
      this.get('store').find('event', { start_date, end_date }).then( (events) => {
        callback(events.map( (event) => {
          var title = "";
          if (event.get('location')) { title = event.get('location').get('title'); }
          if (event.get('workout')) { title = event.get('workout').get('title'); }
          return {
            id: event.id,
            title: title,
            start: event.get('date')
          };
        }));
      });
    }
  }
});
