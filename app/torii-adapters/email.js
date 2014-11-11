import Ember from 'ember';

export default Ember.Object.extend({
  open: function (authorization) {
    console.log('torii open');
    var store = this.get('store');
    return store.find('sessions', authorization.sessionToken).then( function (user) {
      return {
        token: authorization.sessionToken,
        currentUser: user
      };
    });
  },

  fetch: function (options) {
    console.log('torii fetch');
    var store = this.get('store');
    // return store.find('sessions', authorization.sessionToken).then( function (user) {
    //   return {
    //     token: authorization.sessionToken,
    //     currentUser: user
    //   };
    // });
  },

  close: function () {
    console.log('torii close');
    var store = this.get('store');
    // return Ember.$.ajax({
    //   url: 'sessions'
    // })
  }
});