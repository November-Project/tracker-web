import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return moment(serialized, 'YYYY-MM-DD');
  },

  serialize: function (deserialized) {
    return deserialized.format('YYYY-MM-DD');
  }
});
