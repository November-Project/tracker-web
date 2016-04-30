import Ember from 'ember';

export default Ember.Component.extend({
  shouldDisplayReps: Ember.computed('model.result', 'model.workout', {
    get: function () {
      const model = this.get('model');
      return model.workout.allowUserReps || model.workout.reps !== 0;
    }
  }),

  shouldDisplayTime: Ember.computed('model.result', 'model.workout', {
    get: function () {
      const model = this.get('model');
      return model.workout.allowUserTime || model.workout.time !== 0;
    }
  }),

  displayReps: Ember.computed('model.result', 'model.workout', {
    get: function () {
      const model = this.get('model');
      if (model.workout.allowUserReps) {
        return model.result.reps;
      } else {
        return model.workout.reps;
      }
    }
  }),

  displayTime: Ember.computed('model.result', 'model.workout', {
    get: function () {
      const model = this.get('model');
      if (model.workout.allowUserTime) {
        return this.calcTime(model.result.time);
      } else {
        return this.calcTime(model.workout.time);
      }
    }
  }),

  calcTime: function (time) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    if (secs < 10) {
      return mins + ':0' + secs;
    } else {
      return mins + ':' + secs;
    }
  }
});
