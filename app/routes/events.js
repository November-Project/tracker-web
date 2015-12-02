import Ember from 'ember';
import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  model: function () {},

  actions: {
    getEvents: function (startDate, endDate, callback) {
      const start_date = startDate.format('YYYY-MM-DD');
      const end_date = endDate.format('YYYY-MM-DD');

      this.get('store').query('event', { start_date, end_date }).then( (events) => {
        callback(events, startDate, endDate);
      });
    },

    eventSelected: function (event) {
      Ember.run.next(this, function () {
        if (Ember.isEmpty(event)) {
          this.transitionTo('events.no_event');
        } else {
          this.transitionTo('events.view', event);
        }
      });
    }
  }
});
