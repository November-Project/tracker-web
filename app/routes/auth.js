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
    return new Ember.RSVP.Promise( (resolve, reject) => {
      window.fbAsyncInit = () => {
        FB.init({
          appId      : '188733467942113',
          xfbml      : true,
          version    : 'v2.1'
        });

        FB.getLoginStatus( (status) => {
          this.get('session').openWithFacebook(status.authResponse).finally( () => {
            this.transitionTo('index');
          });
        });
        resolve();
      };
      Ember.$.getScript('//connect.facebook.net/en_US/sdk.js').fail(reject);
    });
  },

  actions: {
    signInWithFacebook: function () {
      FB.login( (status) => {
        this.get('session').openWithFacebook(status.authResponse).finally( () => {
          this.transitionTo('index');
        });
      }, { scope: 'public_profile,email' });
    }
  }
});
