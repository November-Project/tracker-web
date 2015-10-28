import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('event', params.event_id);
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    this.controllerFor('events').set('date', model.get('date'));
  }
});
