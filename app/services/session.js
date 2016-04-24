import Ember from 'ember';

export default Ember.Service.extend({
  token: null,
  tribe: null,
  user: null,

  init: function () {
    this._super(...arguments);

    if (localStorage && localStorage.token) {
      this.set('token', localStorage.token);
    }
  },

  findTribe: function (tribes) {
    if (localStorage && localStorage.tribe) {
      this.set('tribe', tribes.findBy('id', localStorage.tribe));
    }
  },

  localTribeObserver: Ember.observer('tribe', function () {
    if (localStorage) {
      localStorage.tribe = this.get('tribe.id');
    }
  }),

  localTokenObserver: Ember.observer('token', function () {
    if (localStorage) {
      localStorage.token = this.get('token');
    }
  }),

  isAuthenticated: function () {
    return Ember.isPresent(this.get('token'));
  },

  hasAcceptedTerms: function () {
    const user = this.get('user');
    return Ember.isPresent(user) && user.get('acceptedTerms');
  },

  close: function () {
    this.set('token', null);
    this.set('user', null);
    this.set('tribe', null);

    if (localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('tribe');
    }
  }
});
