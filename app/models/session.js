/* global FB */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  isAuthenticated: function () {
    return Ember.isPresent(this.get('token'));
  },

  hasAcceptedTerms: function () {
    const user = this.get('user');
    return Ember.isPresent(user) && user.get('acceptedTerms');
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
      if (Ember.isPresent(this.get('user'))) { Ember.run(resolve); }

      this.get('store').findRecord('user', 'me').then( (user) => {
        this.set('user', user);
        if (Ember.isNone(this.get('tribe'))) {
          this.set('tribe', user.get('tribe'));
        }
        Ember.run(resolve);
      }, () => {
        this.close();
        Ember.run(reject);
      });
    });
  },

  initFacebook: function () {
    window.fbAsyncInit = function () {
      FB.init({
        appId      : config.FACEBOOK_APP_ID,
        xfbml      : true,
        version    : config.FACEBOOK_API_VERSION
      });
    };

    return Ember.$.getScript('//connect.facebook.net/en_US/sdk.js');
  },

  loginWithFacebook: function () {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      FB.getLoginStatus( (response) => {
        if (response.status === 'connected') {
          this.openWithFacebook(response.authResponse).then(resolve, reject);
        } else {
          FB.login( (status) => {
            this.openWithFacebook(status.authResponse).then(resolve, reject);
          }, { scope: 'public_profile,email' });
        }
      });
    });
  },

  openWithFacebook: function (auth) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: config.API_HOST + '/session/facebook',
      type: 'POST',
      data: JSON.stringify({
        token: auth.accessToken,
        device_info: navigator.userAgent
      }),
      dataType: 'json',
      contentType: 'application/json',
      processData: false
    })).then( (data) => {
      this.set('token', data.token);
    });
  },

  openWithEmailAndPassword: function (email, password) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
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
    })).then( (data) => {
      this.set('token', data.token);
    });
  },

  forgotPassword: function (email) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: config.API_HOST + '/forgot',
      type: 'POST',
      data: JSON.stringify({
        email: email
      }),
      contentType: 'application/json',
      processData: false
    }));
  },

  changePassword: function (password, token) {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: config.API_HOST + '/reset',
      type: 'POST',
      data: JSON.stringify({
        password: password,
        token: token
      }),
      contentType: 'application/json',
      processData: false
    }));
  },

  logout: function () {
    return Ember.RSVP.Promise.cast(Ember.$.ajax({
      url: config.API_HOST + '/sessions',
      type: 'DELETE',
      headers: {
        'AUTHORIZATION': this.get('token')
      }
    })).then( () => {
      this.close();
    });
  },

  close: function () {
    this.set('token', null);
    this.set('user', null);
    this.set('_tribe', null);

    if (localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('tribe');
    }
  }
});
