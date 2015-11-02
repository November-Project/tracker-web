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

  // isEditing: Ember.computed({
  //   get: function () {
  //     return !this.get('model.isNew');
  //   }
  // }),

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
