import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('workout');
  },

  afterModel: function (model) {
    var tribe = this.get('session.tribe');
    model.set('tribe', tribe);
  }
});
