import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend({
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
