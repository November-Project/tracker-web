import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    return this.get('store').findAll('tribe').then( (tribes) => {
      this.session.findTribe(tribes);
      if (this.session.isAuthenticated()) {
        return this.auth.fetchUser().catch( () => {
          this.transitionTo('auth');
        });
      }
    });
  },

  model: function () {
    return this.get('store').peekAll('tribe');
  },

  afterModel: function () {
    return this.auth.initFacebook();
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
