/* global _ */

import Ember from 'ember';
import config from '../config/environment';
import User from '../objects/user';

function camelize (json) {
  if (!json) { return json; }
  let obj = {};
  Object.keys(json).forEach( (value) => {
    if (_.isPlainObject(json[value])) {
      obj[value.camelize()] = camelize(json[value]);
    } else if (_.isArray(json[value])) {
      obj[value.camelize()] = json[value].map(camelize);
    } else {
      obj[value.camelize()] = json[value];
    }
  });
  return obj;
}

function decamelize (json) {
  if (!json) { return json; }
  let obj = {};
  Object.keys(json).forEach( (value) => {
    obj[value.decamelize()] = _.isPlainObject(json[value]) ? camelize(json[value]) : json[value];
  });
  return obj;
}

export default Ember.Service.extend({
  _token: Ember.computed('session.token', {
    get: function () {
      return this.session.get('token');
    }
  }),

  _headers: Ember.computed('_token', {
    get: function () {
      return { 'AUTHORIZATION': this.get('_token') };
    }
  }),

  _buildURL: function (path) {
    return config.API_HOST + '/' + path;
  },

  _get: function (path) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: this._buildURL(path),
      dataType: 'json',
      headers: this.get('_headers')
    }));
  },

  _post: function (path, data, type) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: this._buildURL(path),
      type: 'POST',
      dataType: type || 'json',
      data: JSON.stringify(data),
      contentType: 'application/json',
      headers: this.get('_headers'),
      processData: false
    }));
  },

  _put: function (path, data) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: this._buildURL(path),
      type: 'PUT',
      dataType: 'json',
      data: JSON.stringify(data),
      contentType: 'application/json',
      headers: this.get('_headers'),
      processData: false
    }));
  },

  _delete: function (path) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: this._buildURL(path),
      type: 'DELETE',
      headers: this.get('_headers')
    }));
  },

  getUserStats: function (user) {
    return this._get('users/' + user.id + '/stats').then( (data) => {
      return camelize(data['stats']);
    });
  },

  getUserPrs: function (user) {
    return this._get('users/' + user.id + '/prs').then( (data) => {
      return data['prs'].map(camelize);
    });
  },

  getCurrentUser: function () {
    return this._get('user/me').then( (data) => {
      return User.create(camelize(data['user']));
    });
  },

  saveUser: function (user) {
    return this._put('users/' + user.id, decamelize(user));
  },

  postFacebookSession: function (token, device_info) {
    return this._post('session/facebook', {token, device_info});
  },

  postEmailSession: function (email, password, device_info) {
    return this._post('session/email', {email, password, device_info});
  },

  resetPassword: function (password, token) {
    return this._post('reset', {token, password}, 'text');
  },

  forgotPassword: function (email) {
    return this._post('forgot', {email}, 'text');
  },

  logout: function () {
    return this._delete('sessions');
  },

  getSunrise6kData: function () {
    return this._get('special_events/sunrise6k').then( (data) => {
      return data['events'].map(camelize);
    });
  }
});
