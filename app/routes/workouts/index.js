import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.get('store').findAll('workout');
  }
});
