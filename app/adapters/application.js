import DS from 'ember-data';
import config from '../config/environment';

export default DS.ActiveModelAdapter.extend({
  host: config.API_HOST,

  headers: function () {
    return {
      'AUTHORIZATION': this.get('session').token
    };
  }.property('session.token')
});
