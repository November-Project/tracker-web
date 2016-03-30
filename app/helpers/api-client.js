import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.create({
  _buildURL: function (path) {
    return config.API_HOST + '/' + path;
  },

  _get: function (path) {
    return Ember.$.ajax({
      url: this._buildURL(path),
      dataType: 'json',
      headers: {
        'Authorization': this.session.get('token')
      }
    });
  },

  getUserStats: function (user) {
    return this._get('users/' + user.id + '/stats');
  }
});
