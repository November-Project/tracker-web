import Ember from 'ember';
import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('event', params.event_id);
  },

  afterModel: function (model) {
    return Ember.RSVP.all([
      model.get('results'),
      model.get('verbals')
    ]);
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    this.controllerFor('events').set('date', model.get('date'));
  }
});
