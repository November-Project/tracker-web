import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('user');
  },

  cleanupController: function () {
    this.controller.cleanup();
  }.on('deactivate')
});
