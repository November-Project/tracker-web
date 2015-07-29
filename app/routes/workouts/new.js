import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.store.createRecord('workout');
  },

  afterModel: function (model) {
    var tribe = this.get('session._tribe');
    model.set('tribe', tribe);
  }
});
