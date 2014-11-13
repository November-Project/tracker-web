import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function (authentication) {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.ajax({
        url: config.API_HOST + '/session/facebook',
        type: 'POST',
        data: JSON.stringify({
          token: authentication.accessToken,
          device_info: navigator.userAgent
        }),
        dataType: 'json',
        contentType: 'application/json',
        processData: false
      }).then( function (data) {
        console.log(data);
        Ember.$.getJSON(config.API_HOST + '/sessions/' + encodeURIComponent(data.token)).then( function (userData) {
          Ember.run.bind(null, resolve, {
            currentUser: userData.user,
            token: data.token
          });
        });
      }, function (jqXHR, textStatus, error) {
        Ember.run.bind(null, reject, { message: error });
      });
    });
  },

  fetch: function (options) {
    console.log('fb-fetch');
    console.log(options);
  }
});