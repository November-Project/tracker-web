import BaseTribeAdapter from './base-tribe';

export default BaseTribeAdapter.extend({
  buildURL: function (type, id, snapshot, action, data) {
    const tribe = this.get('session.tribe.id');
    if (action === 'query' && data.eventId) {
      const eventId = data.eventId;
      delete data.eventId;
      return this.host + '/tribes/' + tribe + '/events/' + eventId + '/results';
    } else if (snapshot && !id) {
      return this.host + '/tribes/' + tribe + '/events/' + snapshot.belongsTo('event').get('id') + '/results';
    } else if (snapshot && id) {
      return this.host + '/tribes/' + tribe + '/events/' + snapshot.belongsTo('event').get('id') + '/results/' + id;
    } else {
      return this._super(type, id, snapshot, action, data);
    }
  }
});
