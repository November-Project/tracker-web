import Ember from 'ember';

var Session = Ember.Object.extend({
  init: function () {
    this._super();
    this.set('token', localStorage.token);
  },

  currentUser: null,
  token: null,

  setToken: function (token) {
    this.set('token', token);
    localStorage.token = token;
  },

  signOut: function () {
    localStorage.removeItem('token');
    this.set('token', null);
    this.set('currentUser', null);
  },

  findCurrentUser: function () {
    this.get('store').find('user', 'me').then( function (user) {
      this.setCurrentUser(user);
    });
  },

  setCurrentUser: function (user) {
    this.set('currentUser', user);
  }
});

export default Session;