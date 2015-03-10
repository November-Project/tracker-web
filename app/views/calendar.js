import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'calendar',

  didInsertElement: function () {
    var self = this;
    Ember.$('#calendar').fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      businessHours: true,
      events: function (start, end, timezone, callback) {
        self.get('controller').get('store').find('event', { start_date: start.toISOString(), end_date: end.toISOString() }).then( function (events) {
          callback(events.map( function (event) {
            var title = "";
            if (event.get('workout')) { title = event.get('workout').get('title'); }
            if (event.get('location')) { title = event.get('location').get('title'); }
            return {
              id: event.id,
              title: title,
              start: event.get('date')
            };
          }));
        });

        self.get('controller').get('store').find('schedule').then(function (schedules) {
          schedules.forEach( function (schedule) {
            Ember.$('.fc-' + schedule.get('displayDay').toLowerCase()).addClass('green-day');
          });
        });
        Ember.$('div.fc-widget-header th:nth-child(2)').addClass('green-day');
      },
      dayClick: function (date) {
        console.log(this.hasClass('green-day'));
        console.log(date.format());
      },
      eventClick: function (event) {
        console.log(event);
      }
    });
  }
});