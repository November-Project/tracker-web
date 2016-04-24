import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  fetchUser: function () {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      if (Ember.isPresent(this.session.get('user'))) {
        Ember.run(resolve);
        return;
      }

      this.client.getCurrentUser().then( (user) => {
        this.session.set('user', user);
        if (Ember.isNone(this.session.get('tribe'))) {
          let tribe = this.store.peekAll('tribe').findBy('id', String(user.get('tribeId')));
          this.session.set('tribe', tribe);
        }
        Ember.run(resolve);
      }, () => {
        this.session.close();
        Ember.run(reject);
      });
    });
  },

  initFacebook: function () {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : config.FACEBOOK_APP_ID,
        xfbml      : true,
        version    : config.FACEBOOK_API_VERSION
      });

      FB.getLoginStatus( (response) => {
        this.set('facebook_response', response);
      });
    };

    return Ember.$.getScript('//connect.facebook.net/en_US/sdk.js');
  },

  loginWithFacebook: function () {
    return new Ember.RSVP.Promise( (resolve, reject) => {
      const response = this.get('facebook_response');
      if (response && response.status === 'connected') {
        this.openWithFacebook(response.authResponse).then(resolve, reject);
      } else {
        FB.login( (status) => {
          this.openWithFacebook(status.authResponse).then(resolve, reject);
        }, { scope: 'public_profile,email' });
      }
    });
  },

  openWithFacebook: function (auth) {
    return this.client.postFacebookSession(auth.accessToken, navigator.userAgent)
      .then( (data) => {
        this.session.set('token', data.token);
      });
  },

  openWithEmailAndPassword: function (email, password) {
    return this.client.postEmailSession(email, password, navigator.userAgent)
      .then( (data) => {
        this.session.set('token', data.token);
      });
  },

  forgotPassword: function (email) {
    return this.client.forgotPassword(email);
  },

  changePassword: function (password, token) {
    return this.client.resetPassword(password, token);
  },

  logout: function () {
    return this.client.logout().then( () => {
      this.session.close();
    });
  }
});
