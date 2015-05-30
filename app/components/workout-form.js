import Ember from 'ember';

export default Ember.Component.extend({
  savable: function () {
    return this.get('model.isDirty') && this.get('model.title') !== "" && this.get('model.title') !== undefined;
  }.property('model.title', 'model.isDirty'),

  reps: function (key, value) {
    if (arguments.length > 1) {
      this.set('model.reps', parseFloat(value));
    }

    return this.get('model.reps');
  }.property('model.reps'),

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
