import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('user');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('model', model);
    this.controllerFor("tribes").set("content", this.store.find("tribe"));
  }
});