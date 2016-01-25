import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.get('store').findAll('tribe').then( () => {
      const session = this.get('session');
      if (session.isAuthenticated()) {
        return session.fetchUser().catch( () => {
          this.transitionTo('auth');
        });
      }
    });
  },

  model: function () {
    return this.get('store').peekAll('tribe');
  },

  afterModel: function () {
    return this.get('session').initFacebook();
  },

  actions: {
    changeTribe: function (tribe) {
      this.set('session.tribe', tribe);
      if (this.controller.currentRouteName.startsWith('admin')) {
        this.transitionTo('admin.events');
      } else {
        this.transitionTo('events');
      }
      window.location.reload(true);
    }
  }
});
