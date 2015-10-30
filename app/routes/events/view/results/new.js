import AuthenticationRoute from '../../../authentication';

export default AuthenticationRoute.extend({
  model: function () {
    const event = this.modelFor('events.view');
    return this.store.createRecord('result', { event });
  },

  renderTemplate: function () {
    this.render(this.routeName, { into: 'application' });
  },

  actions: {
    save: function () {
      this.get('controller.model').save().then( () => {
        const event = this.modelFor('events.view');
        this.transitionTo('events.view', event);
      });
    },

    cancel: function () {
      if (window.history.length > 0) {
        window.history.back();
      } else {
        const event = this.modelFor('events.view');
        this.transitionTo('events.view', event);
      }
    },

    delete: function () {
      this.get('controller.model').destroyRecord().then( () => {
        const event = this.modelFor('events.view');
        this.transitionTo('events.view', event);
      });
    }
  }
});
