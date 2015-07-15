import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  didInsertElement: function () {
    var self = this;

    Ember.$('#calendar').fullCalendar({
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },

      businessHours: true,

      events: (start, end, timezone, callback) => {
        this.sendAction('getEvents', callback, start.toISOString(), end.toISOString());

        this.sendAction('getSchedule', (schedule) => {
          schedule.forEach( (day) => {
            var d = 'wed';
            switch (day) {
              case 0: d = 'sun'; break;
              case 1: d = 'mon'; break;
              case 2: d = 'tue'; break;
              case 3: d = 'wed'; break;
              case 4: d = 'thu'; break;
              case 5: d = 'fri'; break;
              case 6: d = 'sat'; break;
            }
            Ember.$('.fc-' + d).addClass('green-day');
          });
        });
      },

      dayClick: function (date) {
        self.sendAction('isValidDay', moment(date).day(), () => {
          var id = 'new';
          Ember.$('#calendar').fullCalendar('clientEvents', (event) => {
            if (event.start.format().startsWith(date.format())) {
              id = event.id;
            }
          });
          self.sendAction('openEvent', id);
        });
      },

      eventClick: (event) => {
        this.sendAction('openEvent', event.id);
      }
    });
  }
});
