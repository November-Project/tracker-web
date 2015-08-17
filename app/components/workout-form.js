import Ember from 'ember';

export default Ember.Component.extend({
  savable: Ember.computed('model.title', 'model.hasDirtyAttributes', {
    get: function () {
      return this.get('model.hasDirtyAttributes') && Ember.isPresent(this.get('model.title'));
    }
  }),

  reps: Ember.computed('model.reps', {
    get: function () {
      return this.get('model.reps');
    },
    set: function (key, value) {
      this.set('model.reps', parseFloat(value));
      return this.get('model.reps');
    }
  }),

  cleanup: function () {
    const workout = this.get('model');

    if (workout.get('isNew')) {
      workout.destroyRecord();
    } else {
      workout.rollback();
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
