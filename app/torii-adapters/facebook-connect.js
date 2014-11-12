import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function (authentication) {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.post(config.API_HOST + '/session/facebook', {
        token: authentication.accessToken,
        device_info: navigator.userAgent
      }).then( function (data) {
        this.get('store').find('sessions', data.token).then( function (user) {
          Ember.run.bind(null, resolve, {
            currentUser: user,
            token: data.token
          });
        });
      }, function (jqXHR, textStatus, error) {
        Ember.run.bind(null, reject, { message: error });
      });
    });
  }
});