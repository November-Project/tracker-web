import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  isNewSerializerAPI: true,

  serializeIntoHash: function (hash, type, record, options) {
    // remove root key
    Ember.merge(hash, this.serialize(record, options));
  },

  serializeBelongsTo: function (record, json, relationship) {
    // cast ids to Int for belongsTo relationships
    var key = relationship.key;
    var belongsTo = record.get(key);
    key = this.keyForRelationship ? this.keyForRelationship(key, 'belongsTo') : key;
    json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.id);
  },

  keyForRelationship: function (key, relationship, method) {
    const newKey = Ember.String.underscore(key);

    if (relationship === 'belongsTo') {
      return newKey + '_id';
    }
    return this._super(newKey, relationship, method);
  },

  keyForAttribute: function (key) {
    return Ember.String.underscore(key);
  },

  payloadKeyFromModelName: function (modelName) {
    return Ember.String.underscore(modelName);
  }
});
