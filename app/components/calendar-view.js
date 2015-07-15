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
        this.sendAction('getEvents', callback, start.toISOString(), end.toISOString());
      },

      dayRender: (date, cell) => {
        this.sendAction('isValidDay', moment(date).day(), () => {
          cell.addClass('green-day');
        });
      },

      dayClick: (date) => {
        this.sendAction('isValidDay', moment(date).day(), () => {
          var id = 'new';
          Ember.$('#calendar').fullCalendar('clientEvents', (event) => {
            if (event.start.format().startsWith(date.format())) {
              id = event.id;
            }
          });
          this.sendAction('openEvent', id);
        });
      },

      eventClick: (event) => {
        this.sendAction('openEvent', event.id);
      }
    });
  }
});
