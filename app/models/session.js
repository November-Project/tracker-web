import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  token: null,
  user: null,

  isAuthenticated: function () {
    return !!this.getToken();
  },

  hasAcceptedTerms: function () {
    return this.user.get('acceptedTerms');
  },

  getToken: function () {
    if (!this.token && localStorage && localStorage["token"]) { this.token = localStorage["token"]; }
    return this.token;
  },

  setToken: function (token) {
    this.token = token;
    if (localStorage) { localStorage["token"] = token; }
    return this.fetchUser();
  },

  fetchUser: function () {
    var self = this;
    return this.store.find('user', 'me').then( function (user) {
      self.user = user;
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
    this.token = null;
    if (localStorage) { localStorage.removeItem("token"); }
  }
});