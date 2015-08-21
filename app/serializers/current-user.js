import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  isNewSerializerAPI: true,

  typeForRoot: function () {
    return this._super('current-user');
  }
});
