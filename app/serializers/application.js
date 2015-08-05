import Ember from 'ember';
import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serializeIntoHash: function (hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  serializeBelongsTo: function (record, json, relationship) {
    var key = relationship.key;
    var belongsTo = record.get(key);
    key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;
    json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.id);
  }
});
