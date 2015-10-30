import NewResultsRoute from './new';

export default NewResultsRoute.extend({
  model: function (params) {
    return this.store.findRecord('result', params.result_id);
  }
});
