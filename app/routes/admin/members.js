import AdministrationRoute from '../administration';

export default AdministrationRoute.extend({
  model: function () {
    const tribe = this.get('session.tribe');
    return this.store.query('user', { tribe: tribe.id });
  }
});
