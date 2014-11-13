import Ember from 'ember';

export default Ember.Object.extend({
  open: function (auth) {
    console.log('app-adapter-open');
    console.log(auth);
  },

  fetch: function (options) {
    console.log('app-adapter-fetch');
    console.log(options);
  },

  close: function () {
    console.log('app-adapter-close');
  }
});