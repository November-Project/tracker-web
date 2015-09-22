import Ember from 'ember';
import AuthenticationRoute from './authentication';

export default AuthenticationRoute.extend({
  actions: {
    getEvents: function (start_date, end_date, callback) {
      this.get('store').query('event', { start_date, end_date }).then(callback);
    }
  }
});
