import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    workout: { deserialize: 'records' },
    location: { deserialize: 'records' }
  },

  normalize: function (modelName, hash, prop) {
    hash.links = {
      results: 'results',
      verbals: 'verbals'
    };
    return this._super(modelName, hash, prop);
  }
});
