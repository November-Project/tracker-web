import Ember from 'ember';

export default Ember.Component.extend({
  workout: Ember.computed.alias('model.event.workout'),

  attended: false,

  allowReps: Ember.computed({
    get: function () {
      return this.get('workout.allowUserReps');
    }
  }),

  allowTime: Ember.computed({
    get: function () {
      return this.get('workout.allowUserTime');
    }
  }),

  allowPR: Ember.computed({
    get: function () {
      return this.get('workout.allowUserPR');
    }
  }),

  isNotTracked: Ember.computed({
    get: function () {
      return !this.get('allowReps') && !this.get('allowTime')
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

  savable: Ember.computed('model.hasDirtyAttributes', 'attended', {
    get: function () {
      return this.get('model.hasDirtyAttributes') || this.get('isNotTracked');
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
      if (this.get('isNotTracked')) {
        if (this.get('attended')) {
          this.sendAction();
        } else {
          if (this.get('model.isNew')) {
            this.sendAction('cancel');
          } else {
            this.sendAction('delete');
          }
        }
      } else {
        this.sendAction();
      }
    },

    cancel: function () {
      this.sendAction('cancel');
    },

    delete: function () {
      this.sendAction('delete');
    }
  }
});
