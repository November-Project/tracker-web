import SuperAdministrationRoute from '../../super-administration';

export default SuperAdministrationRoute.extend({
  model: function () {
    return this.get('store').findAll('tribe');
  }
});
