import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.findRecord('workout', params.workout_id);
  },

  actions: {
    save: function () {
      this.get('controller.model').save().then( () => {
        this.replaceWith('workouts.index');
      }, function (err) {
        console.log(err);
      });
    }
  }
});
