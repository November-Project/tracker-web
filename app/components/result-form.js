import Ember from 'ember';

export default Ember.Component.extend({
  allowReps: Ember.computed({
    get: function () {
      return true;
    }
  }),

  allowTime: Ember.computed({
    get: function () {
      return true;
    }
  }),

  allowPR: Ember.computed({
    get: function () {
      return true;
    }
  }),

  isEditing: Ember.computed({
    get: function () {
      return !this.get('model.isNew');
    }
  }),

  cleanup: function () {
    const result = this.get('model');

    if (result.get('isNew')) {
      result.destroyRecord();
    } else {
      result.rollbackAttributes();
    }
  }.on('willDestroyElement'),

  actions: {
    save: function () {
      this.sendAction();
    },

    cancel: function () {
      this.sendAction('cancel');
    },

    delete: function () {
      this.sendAction('delete');
    }
  }
});
