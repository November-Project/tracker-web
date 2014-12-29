import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  isAuthenticated: function () {
    return !!this.getToken();
  },

  hasAcceptedTerms: function () {
    if (!this.get('user')) { return false; }
    return this.get('user').get('acceptedTerms');
  },

  getToken: function () {
    if (!this.token && localStorage && localStorage["token"]) { this.set('token', localStorage["token"]); }
    return this.get('token');
  },

  setToken: function (token) {
    this.close();
    this.set('token', token);
    if (localStorage) { localStorage["token"] = token; }
    return this.fetchUser();
  },

  fetchUser: function () {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      if (self.get('user')) { Ember.run(resolve); }

      self.store.find('user', 'me').then( function (user) {
        self.set('user', user);
        Ember.run(resolve);
      }, reject);
    });
  },

  openWithFacebook: function (auth) {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.ajax({
        url: config.API_HOST + '/session/facebook',
        type: 'POST',
        data: JSON.stringify({
          token: auth.accessToken,
          device_info: navigator.userAgent
        }),
        dataType: 'json',
        contentType: 'application/json',
        processData: false
      }).then( function (data) {
        self.setToken(data.token);
        Ember.run(resolve);
      }, reject);
    });
  },

  openWithEmailAndPassword: function (email, password) {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.ajax({
        url: config.API_HOST + '/session/email',
        type: 'POST',
        data: JSON.stringify({
          email: email,
          password: password,
          device_info: navigator.userAgent
        }),
        dataType: 'json',
        contentType: 'application/json',
        processData: false
      }).then( function (data) {
        self.setToken(data.token);
        Ember.run(resolve);
      }, reject);
    });
  },

  forgotPassword: function (email) {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.ajax({
        url: config.API_HOST + '/forgot',
        type: 'POST',
        data: JSON.stringify({
          email: email
        }),
        contentType: 'application/json',
        processData: false
      }).then(resolve, reject);
    });
  },

  logout: function () {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.ajax({
        url: config.API_HOST + '/sessions',
        type: 'DELETE',
        headers: {
          'AUTHORIZATION': self.token
        }
      }).then( function () {
        self.close();
        Ember.run(resolve);
      }, reject);
    });
  },

  close: function () {
    this.set('token', null);
    this.set('user', null);
    if (localStorage) { localStorage.removeItem('token'); }
  }
});