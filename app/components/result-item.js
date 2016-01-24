import Ember from 'ember';

export default Ember.Component.extend({
  editable: false,

  rank: Ember.computed('index', {
    get: function () {
      return parseInt(this.get('index'), 10) + 1;
    }
  }),

  photoURL: Ember.computed({
    get: function () {
      const url = this.get('model.userPhotoUrl');
      if (Ember.isEmpty(url)) {
        return '/images/no_profile.gif';
      } else {
        return url.replace('http://', '//') + '?height=100&width=100';
      }
    }
  }),

  shouldSplit: Ember.computed({
    get: function () {
      const workout = this.get('workout');
      return workout.get('allowUserReps') || workout.get('allowUserTime');
    }
  }),

  shouldDisplayReps: Ember.computed({
    get: function () {
      const workout = this.get('workout');
      return workout.get('allowUserReps') || workout.get('reps') !== 0;
    }
  }),

  shouldDisplayTime: Ember.computed({
    get: function () {
      const workout = this.get('workout');
      return workout.get('allowUserTime') || workout.get('time') !== 0;
    }
  }),

  displayReps: Ember.computed({
    get: function () {
      const workout = this.get('workout');
      if (workout.get('allowUserReps')) {
        return this.get('model.reps');
      } else {
        return workout.get('reps');
      }
    }
  }),

  displayTime: Ember.computed({
    get: function () {
      const workout = this.get('workout');
      if (workout.get('allowUserTime')) {
        return this.calcTime(this.get('model'));
      } else {
        return this.calcTime(workout);
      }
    }
  }),

  calcTime: function (model) {
    const mins = model.get('minutes');
    const secs = model.get('seconds');

    if (secs < 10) {
      return mins + ':0' + secs;
    } else {
      return mins + ':' + secs;
    }
  }
});
