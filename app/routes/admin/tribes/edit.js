import TribesNewRoute from './new';

export default TribesNewRoute.extend({
  model: function (params) {
    return this.store.findRecord('tribe', params.tribe_id);
  }
});
