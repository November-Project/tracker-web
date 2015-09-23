import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function (type, id) {
    if (id === 'me') {
      return this.host + '/user/me';
    } else {
      return this._super(type, id);
    }
  }
});
