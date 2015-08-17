import Ember from 'ember';

export default Ember.Component.extend({
  savable: Ember.computed('model.title', 'model.hasDirtyAttributes', {
    get: function () {
      return this.get('model.hasDirtyAttributes') && Ember.isPresent(this.get('model.title'));
    }
  }),

  cleanup: function () {
    const location = this.get('model');

    if (location.get('isNew')) {
      location.destroyRecord();
    } else {
      location.rollback();
    }
  }.on('willDestroyElement'),

  actions: {
    save: function () {
      this.sendAction();
    },

    cancel: function () {
      this.sendAction('cancel');
    }
  }
});
