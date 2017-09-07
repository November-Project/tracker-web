import Ember from 'ember';

export default Ember.Component.extend({
  greenDays: [],

  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.$('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },

        businessHours: true,

        events: (start, end, timezone, callback) => {
          this.sendAction('getEvents', callback, start.toISOString(), end.toISOString());
        },

        dayRender: (date, cell) => {
          if (this.get('greenDays').indexOf(moment(date).day()) > -1) {
            cell.addClass('green-day');
          }
        },

        dayClick: (date) => {
          var model = 'new';
          Ember.$('#calendar').fullCalendar('clientEvents', (event) => {
            if (event.start.format().startsWith(date.format())) {
              model = event;
            }
          });
          this.sendAction('openEvent', model, date.format());
        },

        eventClick: (event) => {
          this.sendAction('openEvent', event, event.start.format('YYYY-MM-DD'));
        }
      });
    });
  }
});
