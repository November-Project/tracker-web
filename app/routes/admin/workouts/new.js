import AdministrationRoute from '../../administration';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session.tribe');
    return this.store.createRecord('workout', { tribe });
  },

  actions: {
    save: function () {
      const btn = Ember.$('#save');
      btn.button('loading');

      this.get('controller.model').save().then( () => {
        btn.button('reset');
        this.transitionTo('workouts.index');
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
        btn.button('reset');
      });
    },

    cancel: function () {
      if (window.history.length > 0) { window.history.back(); }
      else { this.transitionTo('locations'); }
    }
  }
});
