import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    return this.store.fetchAll('users', 'leaders');
  }
});
