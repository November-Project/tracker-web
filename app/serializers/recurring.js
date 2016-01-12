import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    workout: { deserialize: 'records' },
    location: { deserialize: 'records' }
  },

  normalize: function (modelName, hash, prop) {
    hash.times = hash.times.join(',');
    hash.days = hash.days.join(',');
    return this._super(modelName, hash, prop);
  },

  serializeAttribute: function (snapshot, json, key, attributes) {
    if (key === 'times') {
      json.times = snapshot.attr('times').split(',').filter(Ember.isPresent);
    } else if (key === 'days') {
      json.days = snapshot.attr('days').split(',').filter(Ember.isPresent).map( function (v) { return parseInt(v); });
    } else {
      this._super(snapshot, json, key, attributes);
    }
  }
});
