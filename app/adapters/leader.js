import BaseTribeAdapter from './base-tribe';

export default BaseTribeAdapter.extend({
  createRecord: function(store, type, snapshot) {
    return this.ajax(this.buildURL(type.modelName, snapshot.id, snapshot, 'findRecord'), "POST");
  },
});
