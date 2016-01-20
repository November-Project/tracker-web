import Ember from 'ember';
import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('event', params.event_id);
  },

  afterModel: function (model) {
    return model.get('results');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    this.controllerFor('events').set('_selected', model.get('date'));
    this._reloadVerbals(model.get('date').format('YYYY-MM-DD'));
  },

  _reloadVerbals: function (date) {
    this.store.query('verbal', { date }).then( (verbals) => {
      this.controller.set('verbals', verbals);
    });
  },

  actions: {
    reloadVerbals: function (date) {
      this._reloadVerbals(date);
    }
  }
});
