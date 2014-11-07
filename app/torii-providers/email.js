import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function (options) {
    return new Ember.RSVP.Promise( function (resolve, reject) {
      Ember.$.post(config.API_HOST + '/session/email', {
        'username': options.username,
        'password': options.password
      }).done( function (data) {
        Ember.run.bind(null, resolve, { sessionToken: data.token });
      }).fail( function (jqXHR, textStatus, errorThrown) {
        Ember.run.bind(null, reject, { message: errorThrown });
      });
    });
  }
});