import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  isAuthenticated: function () {
    return Ember.isPresent(this.get('token'));
  },

  hasAcceptedTerms: function () {
    if (!this.get('user')) { return false; }
    return this.get('user').get('acceptedTerms');
  },

  token: Ember.computed({
    get: function () {
      if (Ember.isEmpty(this.get('_token'))) {
        this.set('_token', localStorage ? localStorage.token : null);
      }
      return this.get('_token');
    },
    set: function (key, value) {
      this.set('_token', value);
      if (localStorage) { localStorage.token = value; }
      return value;
    }
  }),

  tribe: Ember.computed({
    get: function () {
      if (Ember.isEmpty(this.get('_tribe')) && localStorage && localStorage.tribe) {
        this.set('_tribe', this.get('store').peekAll('tribe').findBy('id', localStorage.tribe));
      }
      return this.get('_tribe');
    },
    set: function (key, value) {
      this.set('_tribe', value);
      if (localStorage) { localStorage.tribe = value.get('id'); }
      return value;
    }
  }),

  fetchUser: function () {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      if (this.get('user')) { Ember.run(resolve); }

      this.get('store').findRecord('user', 'me').then( (user) => {
        this.set('user', user);
        if (!this.get('tribe')) { console.log('again'); this.set('tribe', user.get('tribe')); }
        Ember.run(resolve);
      }, () => {
        this.close();
        Ember.run(reject);
      });
    });
  },

  openWithFacebook: function (auth) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
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
      }).then( (data) => {
        this.set('token', data.token);
        Ember.run(resolve);
      }, reject);
    });
  },

  openWithEmailAndPassword: function (email, password) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
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
      }).then( (data) => {
        this.set('token', data.token);
        Ember.run(resolve);
      }, reject);
    });
  },

  forgotPassword: function (email) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
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

  changePassword: function (password, token) {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      Ember.$.ajax({
        url: config.API_HOST + '/reset',
        type: 'POST',
        data: JSON.stringify({
          password: password,
          token: token
        }),
        contentType: 'application/json',
        processData: false
      }).then(resolve, reject);
    });
  },

  logout: function () {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      Ember.$.ajax({
        url: config.API_HOST + '/sessions',
        type: 'DELETE',
        headers: {
          'AUTHORIZATION': this.get('token')
        }
      }).then( () => {
        this.close();
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
