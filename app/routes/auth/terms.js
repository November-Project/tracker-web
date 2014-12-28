import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var session = this.get('session');
    var self = this;
    return session.fetchUser().finally( function () {
      if (session.hasAcceptedTerms()) {
        self.transitionTo('index');
      }
    });
  },

  model: function () {
    return this.get('session').get('user');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor('tribes').set('content', this.store.find('tribe'));
  }
});