import AuthenticationRoute from '../authentication';

export default AuthenticationRoute.extend({
  model: function (params) {
    return this.store.findRecord('user', params.user_id, { reload: true });
  },

  afterModel: function () {
    this.transitionTo('users.user.profile');
  }
});
