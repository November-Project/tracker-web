import Ember from 'ember';

export default Ember.Route.extend({
  cleanupController: function () {
    this.controller.cleanup();
  }.on('deactivate')
});
