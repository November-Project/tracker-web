import DS from 'ember-data';
import config from '../config/environment';

var ApplicationAdapter = DS.ActiveModelAdapter.extend({
  host: config.API_HOST,
  headers: function () {
    return {
      'AUTHORIZATION': this.get('session').token
    };
  }.property('App.token')
});

export default ApplicationAdapter;