import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    workout: { deserialize: 'records' },
    location: { deserialize: 'records' }
  },

  normalize: function (modelName, hash, prop) {
    hash.links = {
      results: 'results'
    };
    hash.times = hash.times.join(',');
    return this._super(modelName, hash, prop);
  },

  serializeAttribute: function (snapshot, json, key, attributes) {
    if (key === 'times') {
      json.times = snapshot.attr('times').split(',').filter(Ember.isPresent);
    }  else {
      this._super(snapshot, json, key, attributes);
    }
  }
});
