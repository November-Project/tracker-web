import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('workout');
  },

  afterModel: function (model) {
    var tribe = this.get('session').getTribe();
    model.set('tribe', tribe);
  },

  setupController: function (controller, model) {
    this.controllerFor('workouts.edit').setProperties({ model: model });
  },

  renderTemplate: function () {
    this.render('workouts/edit');
  }
});
