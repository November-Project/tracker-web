import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return moment(serialized);
  },

  serialize: function (deserialized) {
    return deserialized;
  }
});
