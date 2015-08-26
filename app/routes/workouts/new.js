import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session.tribe');
    return this.store.createRecord('workout', { tribe });
  },

  actions: {
    save: function () {
      this.get('controller.model').save().then( () => {
        this.transitionTo('workouts.index');
      });
    },

    cancel: function () {
      if (window.history.length > 0) { window.history.back(); }
      else { this.transitionTo('locations'); }
    }
  }
});
