import DS from 'ember-data';
import _ from 'lodash';

export default DS.Transform.extend({
  deserialize: function (serialized) {
    return serialized.join(',');
  },

  serialize: function (deserialized) {
    return _.map(deserialized.split(','), function (v) { return parseInt(v); });
  }
});
