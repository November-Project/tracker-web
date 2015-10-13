import Ember from 'ember';

export default Ember.Component.extend({
  canGiveVerbal: Ember.computed('verbals', 'verbals.[]', {
    get: function () {
      if (Ember.isNone(this.get('verbals'))) { return false; }
      const userId = parseInt(this.get('currentUser.id'), 10);
      return Ember.isEmpty(this.get('verbals').findBy('userId', userId));
    }
  }),

  canTakeBackVerbal: Ember.computed('verbals', 'verbals.[]', {
    get: function () {
      if (Ember.isNone(this.get('verbals'))) { return false; }
      const userId = parseInt(this.get('currentUser.id'), 10);
      return Ember.isPresent(this.get('verbals').findBy('userId', userId));
    }
  }),

  actions: {
    takeBackVerbal: function () {
      const userId = parseInt(this.get('currentUser.id'), 10);
      const verbal = this.get('verbals').findBy('userId', userId);
      this.sendAction('takeBackVerbal', verbal);
    },

    giveVerbal: function () {
      this.sendAction('giveVerbal');
    }
  }
});
