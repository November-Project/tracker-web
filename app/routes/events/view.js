import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('event', params.event_id);
  }
});
