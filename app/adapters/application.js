import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.API_HOST,

  shouldReloadAll: function () {
    return true;
  },

  headers: Ember.computed('session.token', {
    get: function () {
      return {
        'AUTHORIZATION': this.get('session.token')
      };
    }
  }),

  handleResponse: function (status, headers, payload) {
    if (this.isError(status, headers, payload)) {
      const message = payload.message || "Unknown Error Occured";
      return new DS.AdapterError(payload, message);
    } else if (this.isSqlError(status, headers, payload)) {
      const message = this.parseSqlError(payload);
      return new DS.AdapterError(payload, message);
    }
    return this._super(status, headers, payload);
  },

  isError: function (status) {
    return status >= 400 && status < 422;
  },

  isSqlError: function (status, headers, payload) {
    return status === 500 && payload && payload.error && payload.error.startsWith && payload.error.startsWith('SqlError');
  },

  parseSqlError: function (payload) {
    const error = payload.error;
    console.error(error);

    const sqlErrors = error.match(/sqlErrorMsg = "(.+?)", sqlErrorDetail = "(.+?)"/);

    if (sqlErrors && sqlErrors.length === 3) {
      const sqlErrorMsg = sqlErrors[1];
      const sqlErrorDetail = sqlErrors[2];

      // unique constraint error
      if (sqlErrorMsg.startsWith('duplicate key value violates unique constraint')) {
        const parts = sqlErrorDetail.match(/.+\((.+?)\)=\((.+?)\).+/);
        if (parts) {
          return parts[1] + ' "' + parts[2] + '" already exists.';
        } else {
          return sqlErrorDetail;
        }
      }
    } else {
      return 'Unknown Database Error';
    }
  }
});
