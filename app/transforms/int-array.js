import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return serialized.join(',');
  },

  serialize: function (deserialized) {
    return _.map(deserialized.split(',').filter(Ember.isPresent), function (v) { return parseInt(v); });
  }
});
