import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';
import config from '../config/environment';

export default ActiveModelAdapter.extend({
  host: config.API_HOST,

  shouldReloadAll: function () {
    return true;
  },

  headers: Ember.computed('session.token', {
    get: function () {
      return {
        'AUTHORIZATION': this.get('session.token')
      };
    }
  })
});
