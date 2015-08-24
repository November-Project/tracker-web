import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return serialized.join(',');
  },

  serialize: function (deserialized) {
    return deserialized.split(',');
  }
});
