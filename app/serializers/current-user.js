import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  typeForRoot: function () {
    return this._super('current-user');
  }
});