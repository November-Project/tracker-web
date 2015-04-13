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
            Ember.$('.fc-' + day).addClass('green-day');
          });
        });
      },

      dayClick: function (date) {
        if (!this.hasClass('green-day')) { return; }
        var id = 'new';
        Ember.$('#calendar').fullCalendar('clientEvents', (event) => {
          if (event.start.format().startsWith(date.format())) {
            id = event.id;
          }
        });
        self.sendAction('openEvent', id);
      },

      eventClick: (event) => {
        this.sendAction('openEvent', event.id);
      }
    });
  }
});
