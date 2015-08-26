import WorkoutNewRoute from './new';

export default WorkoutNewRoute.extend({
  model: function (params) {
    return this.store.findRecord('workout', params.workout_id);
  }
});
