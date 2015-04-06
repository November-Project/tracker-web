import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  didInsertElement: function () {
    Ember.$('#calendar').fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      businessHours: true,
      events: (start, end, timezone, callback) => {
        this.get('store').find('event', { start_date: start.toISOString(), end_date: end.toISOString() }).then( (events) => {
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
      },
      dayClick: function (date) {
        console.log(this.hasClass('green-day'));
        console.log(date.format());
      },
      eventClick: function (event) {
        console.log(event);
      }
    });

    this.get('model').forEach( (schedule) => {
      Ember.$('.fc-' + schedule.get('displayDay').toLowerCase()).addClass('green-day');
    });
  }
});
