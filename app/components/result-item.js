import Ember from 'ember';

export default Ember.Component.extend({
  rank: Ember.computed('index', {
    get: function () {
      return parseInt(this.get('index'), 10) + 1;
    }
  }),

  photoURL: Ember.computed({
    get: function () {
      var url = this.get('model.userPhotoUrl');
      if (Ember.isEmpty(url)) {
        return '/images/no_profile.gif';
      } else {
        return url + '?height=100&width=100';
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
        return this.calcTime(this.get('model.time'));
      } else {
        return this.calcTime(workout.get('time'));
      }
    }
  }),

  calcTime: function (time) {
    const mins = Math.floor(time / 60.0);
    const secs = time % 60;

    if (secs < 10) {
      return mins + ':0' + secs;
    } else {
      return mins + ':' + secs;
    }
  }
});
