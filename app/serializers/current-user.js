import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  typeForRoot: function () {
    return this._super('current-user');
  }
});
