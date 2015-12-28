import Ember from 'ember';

export default Ember.Controller.extend({
  titleSorting: ['title'],
  sorted: Ember.computed.sort('tribes', 'titleSorting'),

  currentTribeTitle: Ember.computed.alias('session.tribe.title'),

  isAuthenticated: Ember.computed('session.token', {
    get: function () {
      return this.get('session').isAuthenticated();
    }
  }),

  hasAcceptedTerms: Ember.computed('isAuthenticated', 'session.user.acceptedTerms', 'currentRouteName', {
    get: function () {
      return this.get('isAuthenticated') &&
        this.get('session.user.acceptedTerms') &&
        this.currentRouteName !== 'auth.terms';
    }
  }),

  isAdmin: Ember.computed({
    get: function () {
      return this.get('session.user').isLeaderOf(this.get('session.tribe'));
    }
  }),

  tribes: Ember.computed.map('model', function (tribe) {
    const active = this.get('session.tribe.id') === tribe.id;
    return Ember.ObjectProxy.create({
      content: tribe,
      active: active
    });
  })
});
