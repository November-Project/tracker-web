import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  isNewSerializerAPI: true,

  typeForRoot: function () {
    return this._super('current-user');
  }
});
