/* global FB */
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    if (session.isAuthenticated()) {
      this.transitionTo('index');
    }
  },

  afterModel: function () {
    var self = this;
    return new Ember.RSVP.Promise( function (resolve, reject) {
      window.fbAsyncInit = function () {
        FB.init({
          appId      : '188733467942113',
          xfbml      : true,
          version    : 'v2.1'
        });

        FB.getLoginStatus( function (status) {
          self.get('session').openWithFacebook(status.authResponse).finally( function () {
            self.transitionTo('index');
          });
        });
        resolve();
      };
      Ember.$.getScript('//connect.facebook.net/en_US/sdk.js').fail(reject);
    });
  },

  actions: {
    signInWithFacebook: function () {
      FB.login(function (status) {
        var self = this;
        this.get('session').openWithFacebook(status.authResponse).finally( function () {
          self.transitionTo('index');
        });
      }, { scope: 'public_profile,email' });
    }
  }
});
