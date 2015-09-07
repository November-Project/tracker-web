import Ember from 'ember';

export default Ember.Controller.extend({
  currentTribeTitle: Ember.computed.alias('session.tribe.title'),

  isAdmin: Ember.computed({
    get: function () {
      return this.get('session.user').isLeaderOf(this.get('session.tribe'));
    }
  })
});
