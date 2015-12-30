import Ember from 'ember';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize: function (modelName, hash, prop) {
    hash['days_of_week'] = hash['days_of_week'].join(',');
    return this._super(modelName, hash, prop);
  },

  serializeAttribute: function (snapshot, json, key, attributes) {
    if (key === 'daysOfWeek') {
      json['days_of_week'] = snapshot.attr('daysOfWeek').split(',').filter(Ember.isPresent).map( function (v) { return parseInt(v); });
    } else {
      this._super(snapshot, json, key, attributes);
    }
  }
});
