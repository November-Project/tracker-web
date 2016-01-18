import AuthenticationRoute from '../../../authentication';

export default AuthenticationRoute.extend({
  model: function () {
    const event = this.modelFor('events.view');
    const userId = this.get('session.user.id');
    return this.store.createRecord('result', { event, userId });
  },

  renderTemplate: function () {
    this.render(this.routeName, { into: 'application' });
  },

  actions: {
    save: function () {
      const btn = Ember.$('#save');
      btn.button('loading');

      this.get('controller.model').save().then( () => {
        const event = this.modelFor('events.view');
        btn.button('reset');
        this.transitionTo('events.view', event);
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
        btn.button('reset');
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
      const btn = Ember.$('#delete');
      btn.button('loading');

      this.get('controller.model').destroyRecord().then( () => {
        const event = this.modelFor('events.view');
        event.get('results').reload().then( () => {
          btn.button('reset');
          this.transitionTo('events.view', event);
        });
      }, (error) => {
        this.controller.set('error_message', error.message || 'An Unknown Error Occured');
        window.scrollTo(0, 0);
        btn.button('reset');
      });
    }
  }
});
