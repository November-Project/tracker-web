import Ember from 'ember';
import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  serializeIntoHash: function (hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  serializeBelongsTo: function (record, json, relationship) {
    var key = relationship.key;
    var belongsTo = record.get(key);
    key = this.keyForRelationship ? this.keyForRelationship(key, 'belongsTo') : key;
    json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.id);
  }
});
