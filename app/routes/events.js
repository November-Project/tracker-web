import Ember from 'ember';
import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  model: function () {},

  actions: {
    getEvents: function (start_date, end_date, callback) {
      this.get('store').query('event', { start_date, end_date }).then(callback);
    },

    eventSelected: function (event) {
      Ember.run.scheduleOnce('afterRender', this, function () {
        if (Ember.isEmpty(event)) {
          this.transitionTo('events.no_event');
        } else {
          this.transitionTo('events.view', event);
        }
      });
    }
  }
});
